<?php

/*
|--------------------------------------------------------------------------
| バリデーションメッセージ（日本語）
|--------------------------------------------------------------------------
|
| Japanese is this application's primary locale (APP_LOCALE=ja), so every
| message the staff can trigger should live here.
|
| Only the rules this application actually uses are listed. Any rule that is
| NOT listed here falls back to the framework's English message in
| vendor/laravel/framework/src/Illuminate/Translation/lang/en/validation.php.
| If you add a rule to a FormRequest, add its message below too.
|
| The `attributes` map is what turns ":attributeは必須です。" into
| "場所名は必須です。". Without it the field names render in English inside
| Japanese sentences.
|
| Spacing: placeholders are NOT followed by a space. Japanese does not put a
| space before a particle (:attributeは, not :attribute は), and the attributes
| below are all Japanese, so the compact form is correct.
|
*/

return [

    'accepted' => ':attributeを承認してください。',
    'accepted_if' => ':otherが:valueの場合、:attributeを承認してください。',
    'after' => ':attributeは:dateより後の日時を指定してください。',
    'after_or_equal' => ':attributeは:date以降の日時を指定してください。',
    'alpha' => ':attributeは英字のみで入力してください。',
    'alpha_dash' => ':attributeは英数字・ハイフン・アンダースコアのみで入力してください。',
    'alpha_num' => ':attributeは英数字のみで入力してください。',
    'array' => ':attributeは配列で指定してください。',
    'before' => ':attributeは:dateより前の日時を指定してください。',
    'before_or_equal' => ':attributeは:date以前の日時を指定してください。',
    'between' => [
        'array' => ':attributeは:min個から:max個の間で指定してください。',
        'file' => ':attributeは:minキロバイトから:maxキロバイトの間のファイルを指定してください。',
        'numeric' => ':attributeは:minから:maxの間で指定してください。',
        'string' => ':attributeは:min文字から:max文字の間で入力してください。',
    ],
    'boolean' => ':attributeはtrueまたはfalseを指定してください。',
    'confirmed' => ':attributeが確認用の値と一致しません。',
    'current_password' => 'パスワードが正しくありません。',
    'date' => ':attributeは有効な日付を指定してください。',
    'date_equals' => ':attributeは:dateと同じ日付を指定してください。',
    'date_format' => ':attributeは:format形式で入力してください。',
    'decimal' => ':attributeは小数点以下:decimal桁で指定してください。',
    'declined' => ':attributeを承認しないでください。',
    'different' => ':attributeと:otherには異なる値を指定してください。',
    'digits' => ':attributeは:digits桁で入力してください。',
    'digits_between' => ':attributeは:min桁から:max桁の間で入力してください。',
    'dimensions' => ':attributeの画像サイズが正しくありません。',
    'distinct' => ':attributeに重複した値があります。',
    'email' => ':attributeは有効なメールアドレスを入力してください。',
    'ends_with' => ':attributeは:valuesのいずれかで終わる必要があります。',
    'enum' => ':attributeの値が正しくありません。',
    'exists' => '選択された:attributeは存在しません。',
    'file' => ':attributeはファイルを指定してください。',
    'filled' => ':attributeを入力してください。',
    'gt' => [
        'array' => ':attributeは:value個より多く指定してください。',
        'file' => ':attributeは:valueキロバイトより大きいファイルを指定してください。',
        'numeric' => ':attributeは:valueより大きい値を指定してください。',
        'string' => ':attributeは:value文字より多く入力してください。',
    ],
    'gte' => [
        'array' => ':attributeは:value個以上指定してください。',
        'file' => ':attributeは:valueキロバイト以上のファイルを指定してください。',
        'numeric' => ':attributeは:value以上の値を指定してください。',
        'string' => ':attributeは:value文字以上入力してください。',
    ],
    'image' => ':attributeは画像ファイルを指定してください。',
    'in' => '選択された:attributeは正しくありません。',
    'in_array' => ':attributeは:otherに含まれている必要があります。',
    'integer' => ':attributeは整数で入力してください。',
    'ip' => ':attributeは有効なIPアドレスを入力してください。',
    'json' => ':attributeは有効なJSON文字列を入力してください。',
    'lt' => [
        'array' => ':attributeは:value個より少なく指定してください。',
        'file' => ':attributeは:valueキロバイトより小さいファイルを指定してください。',
        'numeric' => ':attributeは:valueより小さい値を指定してください。',
        'string' => ':attributeは:value文字より少なく入力してください。',
    ],
    'lte' => [
        'array' => ':attributeは:value個以下で指定してください。',
        'file' => ':attributeは:valueキロバイト以下のファイルを指定してください。',
        'numeric' => ':attributeは:value以下の値を指定してください。',
        'string' => ':attributeは:value文字以下で入力してください。',
    ],
    'max' => [
        'array' => ':attributeは:max個以下で指定してください。',
        'file' => ':attributeは:maxキロバイト以下のファイルを指定してください。',
        'numeric' => ':attributeは:max以下で指定してください。',
        'string' => ':attributeは:max文字以内で入力してください。',
    ],
    'mimes' => ':attributeは:values形式のファイルを指定してください。',
    'mimetypes' => ':attributeは:values形式のファイルを指定してください。',
    'min' => [
        'array' => ':attributeは:min個以上指定してください。',
        'file' => ':attributeは:minキロバイト以上のファイルを指定してください。',
        'numeric' => ':attributeは:min以上の値を指定してください。',
        'string' => ':attributeは:min文字以上入力してください。',
    ],
    'missing' => ':attributeは指定しないでください。',
    'multiple_of' => ':attributeは:valueの倍数を指定してください。',
    'not_in' => '選択された:attributeは正しくありません。',
    'not_regex' => ':attributeの形式が正しくありません。',
    'numeric' => ':attributeは数値で入力してください。',
    'password' => [
        'letters' => ':attributeは少なくとも1文字の英字を含めてください。',
        'mixed' => ':attributeは少なくとも英字と数字を1文字ずつ含めてください。',
        'numbers' => ':attributeは少なくとも1文字の数字を含めてください。',
        'symbols' => ':attributeは少なくとも1文字の記号を含めてください。',
        'uncompromised' => '入力された:attributeは漏えいが確認されています。別の:attributeを設定してください。',
    ],
    'present' => ':attributeが存在しません。',
    'prohibited' => ':attributeは入力できません。',
    'prohibited_if' => ':otherが:valueの場合、:attributeは入力できません。',
    'prohibited_unless' => ':otherが:valuesに含まれていない場合、:attributeは入力できません。',
    'regex' => ':attributeの形式が正しくありません。',
    'required' => ':attributeは必須です。',
    'required_if' => ':otherが:valueの場合、:attributeは必須です。',
    'required_if_accepted' => ':otherが承認されている場合、:attributeは必須です。',
    'required_if_declined' => ':otherが承認されていない場合、:attributeは必須です。',
    'required_unless' => ':otherが:valuesに含まれていない場合、:attributeは必須です。',
    'required_with' => ':valuesが指定されている場合、:attributeは必須です。',
    'required_with_all' => ':valuesが指定されている場合、:attributeは必須です。',
    'required_without' => ':valuesが指定されていない場合、:attributeは必須です。',
    'required_without_all' => ':valuesがいずれも指定されていない場合、:attributeは必須です。',
    'same' => ':attributeと:otherが一致しません。',
    'size' => [
        'array' => ':attributeは:size個指定してください。',
        'file' => ':attributeは:sizeキロバイトのファイルを指定してください。',
        'numeric' => ':attributeは:sizeを指定してください。',
        'string' => ':attributeは:size文字で入力してください。',
    ],
    'starts_with' => ':attributeは:valuesのいずれかで始まる必要があります。',
    'string' => ':attributeは文字列で入力してください。',
    'timezone' => ':attributeは有効なタイムゾーンを指定してください。',
    'unique' => 'この:attributeは既に登録されています。',
    'uploaded' => ':attributeのアップロードに失敗しました。',
    'url' => ':attributeは有効なURLを入力してください。',
    'uuid' => ':attributeは有効なUUIDを入力してください。',

    /*
    |--------------------------------------------------------------------------
    | 項目名（:attribute の置換）
    |--------------------------------------------------------------------------
    |
    | Keys are the request field names. Anything not listed here is humanised
    | from the field name by the framework, which produces English.
    |
    | Note: `name` maps to お名前 because the auth and account screens use it for
    | a person. The menu item form also posts `name`, so MenuItemRequest must
    | override it via its own attributes() method — see LOCALIZATION-PLAN §5.
    |
    */

    'attributes' => [
        // users / auth
        'name' => 'お名前',
        'email' => 'メールアドレス',
        'password' => 'パスワード',
        'password_confirmation' => 'パスワード（確認）',

        // locations
        'schedule_date' => '日付',
        'location_name' => '場所名',
        'address' => '住所',
        'landmark_note' => '目印',
        'start_time' => '開始時刻',
        'end_time' => '終了時刻',
        'latitude' => '緯度',
        'longitude' => '経度',
        'map_pin_note' => 'ピンのメモ',
        'transit_note' => 'アクセス',
        'is_event' => 'イベント設定',
        'event_name' => 'イベント名',

        // menu_items
        'slug' => 'スラッグ',
        'description' => '説明',
        'price_yen' => '価格',
        'image' => '画像',
        'image_alt_text' => '画像の代替テキスト',
        'spice_level' => '辛さ',
        'category' => 'カテゴリ',
        'badge_type' => 'バッジ',
        'highlight_tag_1' => 'ハイライト1',
        'highlight_tag_2' => 'ハイライト2',
        'display_order' => '表示順',
        'is_sold_out' => '売り切れ',
        'is_active' => '公開状態',
    ],

];
