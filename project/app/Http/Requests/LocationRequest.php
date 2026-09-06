<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LocationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $entry = $this->route('locationEntry');

        return [
            // One entry per calendar date (DDD §4.1 invariant #1).
            'schedule_date' => ['required', 'date', Rule::unique('locations', 'schedule_date')->ignore($entry?->id)],
            'location_name' => ['required', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:255'],
            'landmark_note' => ['nullable', 'string', 'max:255'],
            // TimeWindow invariant: start < end (DDD §4.1 invariant #2).
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'map_pin_note' => ['nullable', 'string', 'max:255'],
            'transit_note' => ['nullable', 'string', 'max:255'],
            'is_event' => ['sometimes', 'boolean'],
            // EventDetails invariant: event requires a name (DDD §4.1 invariant #3).
            'event_name' => ['nullable', 'string', 'max:255', 'required_if:is_event,1'],
        ];
    }
}
