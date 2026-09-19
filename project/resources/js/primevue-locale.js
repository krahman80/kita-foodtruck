/**
 * PrimeVue ships an English locale, so its DatePicker rendered "September" and
 * "Mo/Tu/We" inside an otherwise Japanese admin screen.
 *
 * PrimeVue reads `config.locale.<key>` directly rather than deep-merging with
 * its built-in defaults, so every key is supplied here instead of relying on a
 * partial-override fallback. Key list taken from `PrimeVueLocaleOptions` in
 * `@primevue/core/config`.
 *
 * Only `fileSizeTypes`, `dayNames`, `dayNamesShort`, `dayNamesMin`,
 * `monthNames` and `monthNamesShort` are non-optional in that type, but the
 * rest are filled in so no PrimeVue component can fall back to English.
 *
 * `firstDayOfWeek` stays 0 (Sunday) to match PrimeVue's default and the
 * conventional Japanese calendar layout.
 */
export const jaLocale = {
    // Filter operators and rule builder
    startsWith: 'で始まる',
    contains: 'を含む',
    notContains: 'を含まない',
    endsWith: 'で終わる',
    equals: 'と等しい',
    notEquals: 'と等しくない',
    noFilter: 'フィルターなし',
    lt: 'より小さい',
    lte: '以下',
    gt: 'より大きい',
    gte: '以上',
    dateIs: '指定日',
    dateIsNot: '指定日以外',
    dateBefore: 'より前',
    dateAfter: 'より後',
    clear: 'クリア',
    apply: '適用',
    matchAll: 'すべて一致',
    matchAny: 'いずれか一致',
    addRule: '条件を追加',
    removeRule: '条件を削除',
    accept: 'はい',
    reject: 'いいえ',
    choose: '選択',
    upload: 'アップロード',
    cancel: 'キャンセル',
    completed: '完了',
    pending: '保留中',
    fileSizeTypes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],

    // Calendar
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    dayNamesMin: ['日', '月', '火', '水', '木', '金', '土'],
    monthNames: [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月',
    ],
    monthNamesShort: [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月',
    ],
    chooseYear: '年を選択',
    chooseMonth: '月を選択',
    chooseDate: '日付を選択',
    prevDecade: '前の10年',
    nextDecade: '次の10年',
    prevYear: '前年',
    nextYear: '翌年',
    prevMonth: '前月',
    nextMonth: '翌月',
    prevHour: '前の時間',
    nextHour: '次の時間',
    prevMinute: '前の分',
    nextMinute: '次の分',
    prevSecond: '前の秒',
    nextSecond: '次の秒',
    am: '午前',
    pm: '午後',
    today: '今日',
    weekHeader: '週',
    firstDayOfWeek: 0,
    showMonthAfterYear: true,
    dateFormat: 'yy年mm月dd日',

    // Password strength
    weak: '弱い',
    medium: '普通',
    strong: '強い',
    passwordPrompt: 'パスワードを入力してください',

    // Empty / selection messages
    emptyFilterMessage: '該当する結果がありません',
    searchMessage: '{0}件の結果が利用可能',
    selectionMessage: '{0}件を選択中',
    emptySelectionMessage: '未選択',
    emptySearchMessage: '該当する結果がありません',
    emptyMessage: 'データがありません',
    fileChosenMessage: '{0}件のファイル',
    noFileChosenMessage: 'ファイルが選択されていません',
};
