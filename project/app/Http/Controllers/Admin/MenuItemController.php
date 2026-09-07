<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuItemRequest;
use App\Models\MenuItem;
use App\Services\MenuFeaturingService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MenuItemController extends Controller
{
    public function __construct(private readonly MenuFeaturingService $featuring) {}

    /**
     * Show the menu management page.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Menu/Index', [
            'menuItems' => MenuItem::orderBy('display_order')->orderBy('id')->get(),
        ]);
    }

    /**
     * Create a new menu item.
     */
    public function store(MenuItemRequest $request): RedirectResponse
    {
        $data = $this->normalize($request);
        $data['image_url'] = $this->storeImage($request);

        MenuItem::create([
            ...$data,
            'slug' => MenuItem::makeSlug($data['name']),
            'is_popular' => false,
        ]);

        return back()->with('flash', ['message' => 'Menu item added.', 'type' => 'success']);
    }

    /**
     * Update a menu item (slug regenerated when the name changes).
     */
    public function update(MenuItemRequest $request, MenuItem $menuItem): RedirectResponse
    {
        $data = $this->normalize($request);

        if ($data['name'] !== $menuItem->name) {
            $data['slug'] = MenuItem::makeSlug($data['name'], $menuItem->id);
        }

        // Deactivating a featured item must clear its popular flag (invariant: active always wins).
        if (! $data['is_active'] && $menuItem->is_popular) {
            $this->featuring->unfeature($menuItem);
        }

        // Replace the image only when a new file is uploaded.
        if ($request->hasFile('image')) {
            $this->deleteStoredImage($menuItem->image_url);
            $data['image_url'] = $this->storeImage($request);
        }

        $menuItem->update($data);

        return back()->with('flash', ['message' => 'Menu item updated.', 'type' => 'success']);
    }

    /**
     * Feature (or un-feature) an item — always through the domain service.
     */
    public function feature(MenuItem $menuItem): RedirectResponse
    {
        if (! $menuItem->is_active) {
            return back()->with('flash', ['message' => 'Activate the item before featuring it.', 'type' => 'warning']);
        }

        $this->featuring->feature($menuItem);

        return back()->with('flash', ['message' => "\"{$menuItem->name}\" is now the featured item.", 'type' => 'success']);
    }

    /**
     * Toggle sold-out state.
     */
    public function toggleSoldOut(MenuItem $menuItem): RedirectResponse
    {
        $menuItem->update(['is_sold_out' => ! $menuItem->is_sold_out]);

        return back()->with('flash', ['message' => 'Sold-out state updated.', 'type' => 'success']);
    }

    /**
     * Toggle active state (deactivating clears the popular flag).
     */
    public function toggleActive(MenuItem $menuItem): RedirectResponse
    {
        $active = ! $menuItem->is_active;

        if (! $active && $menuItem->is_popular) {
            $this->featuring->unfeature($menuItem);
        }

        $menuItem->update(['is_active' => $active]);

        return back()->with('flash', ['message' => 'Visibility updated.', 'type' => 'success']);
    }

    /**
     * Normalize booleans and defaults for mass assignment.
     */
    private function normalize(MenuItemRequest $request): array
    {
        $data = $request->validated();

        $data['is_active'] = (bool) ($data['is_active'] ?? true);
        $data['is_sold_out'] = (bool) ($data['is_sold_out'] ?? false);
        $data['display_order'] = (int) ($data['display_order'] ?? 0);

        return $data;
    }

    /**
     * Store an uploaded menu image on the public disk and return its public path.
     */
    private function storeImage(MenuItemRequest $request): string
    {
        return '/storage/' . $request->file('image')->store('menu', 'public');
    }

    /**
     * Delete a previously stored local image if it lives on our public disk.
     */
    private function deleteStoredImage(?string $url): void
    {
        if ($url && str_starts_with($url, '/storage/')) {
            $file = storage_path('app/public/' . substr($url, strlen('/storage/')));
            if (is_file($file)) {
                unlink($file);
            }
        }
    }
}
