<?php

namespace Tests\Unit;

use FilesystemIterator;
use PHPUnit\Framework\TestCase;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

/**
 * Guardrail for `resources/js/i18n.js`.
 *
 * Japanese is the active locale and `en` is the `fallback_locale`, so a key that
 * exists in `en` but is missing from `ja` renders English to a Japanese visitor.
 * That is a visible defect in the primary language rather than graceful
 * degradation, so it has to fail.
 *
 * The reverse direction — a key in `ja` with no `en` counterpart — is
 * intentional and must NOT fail. The admin, profile and reset/verify auth
 * surfaces are Japanese-only and are pinned that way by `ForceLocale`.
 *
 * The tables live in JavaScript, but this project has no JS test runner and
 * adding a dependency is out of scope, so the file is parsed here instead.
 */
class TranslationParityTest extends TestCase
{
    /**
     * Every real key contains at least one dot. Requiring that keeps a line of
     * prose inside a multi-line string value from being mistaken for a key.
     */
    private const KEY_PATTERN = '/^\s+["\']([a-zA-Z][\w]*\.[\w.]+)["\']?\s*:/m';

    /**
     * A table that parses smaller than this means the pattern stopped matching
     * the file rather than keys having been removed. Without this floor the
     * assertions below would pass vacuously against an empty array.
     */
    private const MIN_PLAUSIBLE_KEYS = 100;

    private const MIN_PLAUSIBLE_USAGES = 100;

    public function test_both_tables_parse(): void
    {
        foreach ($this->tables() as $locale => $keys) {
            $this->assertGreaterThan(
                self::MIN_PLAUSIBLE_KEYS,
                count($keys),
                "The `{$locale}` table parsed to ".count($keys).' keys, which means KEY_PATTERN no longer matches i18n.js. Every other assertion in this file would then pass vacuously.',
            );
        }
    }

    public function test_ja_defines_every_key_that_en_defines(): void
    {
        $tables = $this->tables();

        $missing = array_values(array_diff($tables['en'], $tables['ja']));

        $this->assertSame([], $missing, sprintf(
            "These keys exist in `en` but not in `ja`, so a Japanese visitor would see English:\n  - %s",
            implode("\n  - ", $missing),
        ));
    }

    public function test_no_key_is_defined_twice(): void
    {
        foreach ($this->tables() as $locale => $keys) {
            $duplicates = array_keys(array_filter(
                array_count_values($keys),
                static fn (int $count): bool => $count > 1,
            ));

            $this->assertSame([], $duplicates, sprintf(
                "These keys appear more than once in the `%s` table, where the later value silently wins:\n  - %s",
                $locale,
                implode("\n  - ", $duplicates),
            ));
        }
    }

    public function test_every_key_used_in_components_is_defined(): void
    {
        $tables = $this->tables();
        $defined = array_merge($tables['en'], $tables['ja']);

        $usages = $this->staticUsages();

        $this->assertGreaterThan(
            self::MIN_PLAUSIBLE_USAGES,
            count($usages),
            'Almost no t() calls were found, so the scan is broken and this assertion proves nothing.',
        );

        $undefined = array_values(array_filter(
            $usages,
            static fn (string $key): bool => ! in_array($key, $defined, true),
        ));

        $this->assertSame([], $undefined, sprintf(
            "These keys are referenced in components but defined in neither table, so t() would render the key itself:\n  - %s",
            implode("\n  - ", $undefined),
        ));
    }

    /**
     * Keys referenced as `t('literal')` across the Vue components and JS
     * modules, excluding `i18n.js` itself and any key assembled at runtime.
     *
     * @return list<string>
     */
    private function staticUsages(): array
    {
        $dynamic = [];
        $used = [];

        foreach ($this->jsFiles() as $file) {
            $source = (string) file_get_contents($file);

            // A call such as t(`spice.${level}`) cannot be read statically, so
            // its literal prefix is recorded and used to filter below.
            preg_match_all('/\bt\(\s*`([^`$]*)\$\{/', $source, $dynamicMatches);
            $dynamic = array_merge($dynamic, $dynamicMatches[1]);

            preg_match_all('/\bt\(\s*["\']([^"\']+)/', $source, $usedMatches);
            $used = array_merge($used, $usedMatches[1]);
        }

        return array_values(array_filter(
            array_values(array_unique($used)),
            static function (string $key) use ($dynamic): bool {
                foreach ($dynamic as $prefix) {
                    if (str_starts_with($key, $prefix)) {
                        return false;
                    }
                }

                return true;
            },
        ));
    }

    /**
     * @return list<string>
     */
    private function jsFiles(): array
    {
        $root = dirname(__DIR__, 2).'/resources/js';
        $this->assertDirectoryExists($root);

        $files = [];

        $entries = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($root, FilesystemIterator::SKIP_DOTS)
        );

        foreach ($entries as $entry) {
            if (! $entry->isFile()) {
                continue;
            }

            if (! in_array($entry->getExtension(), ['js', 'vue'], true)) {
                continue;
            }

            // The tables are the subject under test, not a consumer of them.
            if ($entry->getFilename() === 'i18n.js') {
                continue;
            }

            $files[] = $entry->getPathname();
        }

        return $files;
    }

    /**
     * @return array{en: list<string>, ja: list<string>}
     */
    private function tables(): array
    {
        $source = (string) file_get_contents(dirname(__DIR__, 2).'/resources/js/i18n.js');

        $enAt = strpos($source, "\n    en: {");
        $jaAt = strpos($source, "\n    ja: {");
        $endAt = $jaAt === false ? false : strpos($source, "\n};", $jaAt);

        $this->assertIsInt($enAt, 'Could not locate the `en` table in i18n.js.');
        $this->assertIsInt($jaAt, 'Could not locate the `ja` table in i18n.js.');
        $this->assertIsInt($endAt, 'Could not locate the end of the `ja` table in i18n.js.');

        $parse = static function (string $block): array {
            preg_match_all(self::KEY_PATTERN, $block, $matches);

            return $matches[1];
        };

        return [
            'en' => $parse(substr($source, $enAt, $jaAt - $enAt)),
            'ja' => $parse(substr($source, $jaAt, $endAt - $jaAt)),
        ];
    }
}
