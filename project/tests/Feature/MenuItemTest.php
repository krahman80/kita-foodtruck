<?php

namespace Tests\Feature;

use App\Models\MenuItem;
use App\Models\User;
use App\Services\MenuFeaturingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class MenuItemTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    private function item(array $overrides = []): MenuItem
    {
        return MenuItem::create(array_merge([
            'name' => 'The Sapporo Classic',
            'slug' => 'the-sapporo-classic',
            'description' => 'Signature halal chili dog.',
            'price_yen' => 950,
            'image_url' => '/storage/menu/test.jpg',
            'image_alt_text' => 'The Sapporo Classic chili dog',
            'spice_level' => 'mild',
            'category' => 'chili_dog',
            'badge_type' => 'halal_standard',
            'is_popular' => false,
            'is_sold_out' => false,
            'is_active' => true,
            'display_order' => 0,
        ], $overrides));
    }

    public function test_price_must_be_a_positive_whole_number(): void
    {
        $this->post('/admin/menu', [
            'name' => 'Test',
            'description' => 'x',
            'price_yen' => 0,
            'image' => UploadedFile::fake()->image('a.jpg'),
            'image_alt_text' => 'alt',
            'spice_level' => 'mild',
            'category' => 'chili_dog',
            'badge_type' => 'halal_standard',
        ])->assertSessionHasErrors('price_yen');
    }

    public function test_store_requires_an_image_on_create(): void
    {
        $this->post('/admin/menu', [
            'name' => 'Test',
            'description' => 'x',
            'price_yen' => 500,
            'image_alt_text' => 'alt',
            'spice_level' => 'mild',
            'category' => 'chili_dog',
            'badge_type' => 'halal_standard',
        ])->assertSessionHasErrors('image');
    }

    public function test_slug_is_generated_and_unique(): void
    {
        $this->item(['name' => 'Tokyo Dog', 'slug' => 'tokyo-dog']);

        $slug = MenuItem::makeSlug('Tokyo Dog');

        $this->assertSame('tokyo-dog-2', $slug);
    }

    public function test_active_items_only_appear_in_the_public_menu(): void
    {
        $this->item(['display_order' => 1]);
        $this->item(['name' => 'Hidden', 'slug' => 'hidden', 'is_active' => false, 'display_order' => 2]);

        $public = MenuItem::publicMenu();

        $this->assertCount(1, $public);
        $this->assertSame('The Sapporo Classic', $public->first()->name);
    }

    public function test_inactive_popular_item_is_not_returned_as_popular(): void
    {
        $this->item(['is_popular' => true, 'is_active' => false]);

        $this->assertNull(MenuItem::popularItem());
    }

    public function test_sold_out_is_independent_of_active(): void
    {
        $item = $this->item(['is_sold_out' => true, 'is_active' => true]);

        // Sold-out but still active => still public.
        $this->assertTrue(MenuItem::publicMenu()->contains('id', $item->id));
    }

    public function test_featuring_service_keeps_only_one_popular_item(): void
    {
        $a = $this->item(['name' => 'A', 'slug' => 'a']);
        $b = $this->item(['name' => 'B', 'slug' => 'b']);

        (new MenuFeaturingService)->feature($a);
        (new MenuFeaturingService)->feature($b);

        $this->assertFalse($a->fresh()->is_popular);
        $this->assertTrue($b->fresh()->is_popular);
        $this->assertSame(1, MenuItem::where('is_popular', true)->count());
    }
}
