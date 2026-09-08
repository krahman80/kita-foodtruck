import { reactive } from 'vue';

// Lightweight partial i18n (Option A).
// Only "chrome" text is translated: public nav, footer, and section headings.
// DB-driven content (locations/menu/FAQ bodies) is intentionally left as-is.

const messages = {
    en: {
        // Header / nav
        'brand.tagline': 'Sapporo • 100% Halal',
        'nav.spot': "Today's Spot",
        'nav.menu': 'Menu & Prices',
        'nav.story': 'Our Story',
        'nav.dietary': 'Halal & Allergens',
        'nav.faq': 'FAQ',
        'nav.cta': 'Find Truck Today',
        'mnav.location': "Today's Location & Schedule",
        'mnav.menu': 'Full Menu & Prices',
        'mnav.story': 'Our Story',
        'mnav.dietary': 'Halal Sourcing & Allergens',
        'mnav.faq': 'FAQ',
        'mnav.cta': "See Today's Location",
        'toggle.lang': '日本語',

        // Footer
        'foot.contact': 'Contact & Bookings',
        'foot.follow': 'Follow Our Truck',
        'foot.followDesc':
            'Live daily morning location updates, batch announcements, and seasonal special previews.',
        'foot.brandDesc':
            "Sapporo's original 100% halal chili dog food truck. Crafted with slow-simmered beef, fresh Hokkaido milk buns, and genuine northern warmth.",
        'foot.halal': 'Halal Certified Kitchen on Wheels',
        'foot.rights': '© 2026 Kita Halal Chili Dogs Sapporo. All rights reserved.',
        'foot.handcrafted': 'Handcrafted with 100% Halal Certified Beef • Hokkaido, Japan',

        // Section headings (eyebrow + title)
        'loc.eyebrow': 'Schedule & Tracking',
        'loc.title': "Today's Truck Location",
        'loc.sub': 'Our bright orange step van navigates central Sapporo parks and plazas Wednesday through Sunday.',
        'loc.liveStatus': 'Live Service Status',
        'loc.freshBatches': 'Fresh batches prepared every 45 mins',
        'loc.openNow': 'Open Now',
        'loc.spotDetails': 'Spot Details:',
        'loc.transitAccess': 'Transit Access:',
        'loc.mapTitle': 'Food Truck Location Map',
        'loc.restingTitle': 'The Truck is Resting Today',
        'loc.restingDesc':
            'Our kitchen crew is slow-simmering fresh batches of beef chili and sourcing local Hokkaido buns for our upcoming stops. No active street service is scheduled for today.',
        'loc.nextService': 'Next Service:',
        'menu.eyebrow': 'Handcrafted Daily',
        'menu.title': 'Full Menu & Prices',
        'about.eyebrow': 'Our Origins & Mission',
        'about.title': "Why We Built Sapporo's First Halal Chili Dog Van",
        'allergen.eyebrow': 'Transparency & Care',
        'allergen.title': 'Allergen & Dietary Information',
        'faq.eyebrow': 'Questions & Answers',
        'faq.title': 'Frequently Asked Questions',

        // ---- Admin (shared locale) ----
        'admin.nav.dashboard': 'Dashboard',
        'admin.nav.locations': 'Locations',
        'admin.nav.menu': 'Menu',
        'admin.nav.accounts': 'Accounts',
        'admin.profile': 'Profile',
        'admin.logout': 'Log Out',
        'admin.page.dashboard': 'Dashboard',
        'admin.page.locations': 'Location Calendar',
        'admin.page.menu': 'Menu Items',
        'admin.page.accounts': 'Admin Accounts',

        'admin.dash.locTitle': 'Location Calendar',
        'admin.dash.locDesc': "Manage today's stop and the truck's schedule.",
        'admin.dash.menuTitle': 'Menu Items',
        'admin.dash.menuDesc': 'Manage menu items, prices, availability, and featured item.',
        'admin.dash.accTitle': 'Admin Accounts',
        'admin.dash.accDesc': 'Add or remove other admin accounts.',
        'admin.manage.locations': 'Manage locations →',
        'admin.manage.menu': 'Manage menu →',
        'admin.manage.accounts': 'Manage accounts →',
        'admin.dash.tip': 'Tip: if you are using the seeded default password, change it from your',
        'admin.dash.profile': 'profile',

        'admin.loc.addTitle': 'Add a Stop',
        'admin.loc.editTitle': 'Edit Stop',
        'admin.loc.legend.stop': 'Stop',
        'admin.loc.legend.event': 'Event',
        'admin.loc.legend.cancelled': 'Cancelled',

        'admin.saveStop': 'Save stop',
        'admin.saveChanges': 'Save changes',
        'admin.saving': 'Saving…',
        'admin.cancelEdit': 'Cancel edit',
        'admin.cancelStop': 'Cancel this stop',
        'admin.addItem': 'Add item',
        'admin.addMenuItem': 'Add Menu Item',
        'admin.newItem': 'New item',
        'admin.edit': 'Edit',
        'admin.delete': 'Delete',
        'admin.feature': 'Feature',
        'admin.hide': 'Hide',
        'admin.show': 'Show',
        'admin.soldOut': 'Sold out',
        'admin.restock': 'Restock',
        'admin.items': 'Items',
        'admin.you': 'You',
        'admin.adding': 'Adding…',
        'admin.addAccount': 'Add Account',
        'admin.addAdminAccount': 'Add Admin Account',
        'admin.existingAccounts': 'Existing Accounts',
        'admin.th.name': 'Name',
        'admin.th.email': 'Email',
        'admin.th.actions': 'Actions',
        'admin.menuEmpty': 'No menu items yet. Add your first item in the form.',

        // ---- Auth (guest/login) ----
        'auth.logInTitle': 'Log in',
        'auth.welcomeBack': 'Welcome back',
        'auth.signInHint': 'Sign in to manage Kita Chili Dogs.',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.remember': 'Remember me',
        'auth.forgot': 'Forgot your password?',
        'auth.logIn': 'Log in',
        'auth.signingIn': 'Signing in…',
        'auth.tagline': 'Sapporo • Halal Street Food',

        // Forgot / reset password
        'auth.forgotTitle': 'Forgot Password',
        'auth.forgotIntro':
            'Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.',
        'auth.forgotSubmit': 'Email Password Reset Link',

        // Register
        'auth.registerTitle': 'Register',
        'auth.createAccount': 'Create an account',
        'auth.registerHint': 'Register to get started.',
        'auth.name': 'Name',
        'auth.confirmPassword': 'Confirm Password',
        'auth.alreadyRegistered': 'Already registered?',
        'auth.register': 'Register',
        'auth.registering': 'Registering…',
    },

    ja: {
        // Header / nav
        'brand.tagline': '札幌 • 100%ハラル',
        'nav.spot': '本日の営業',
        'nav.menu': 'メニュー・価格',
        'nav.story': '私たちのストーリー',
        'nav.dietary': 'ハラル・アレルギー',
        'nav.faq': 'FAQ',
        'nav.cta': '本日の場所を見る',
        'mnav.location': '本日の場所と営業時間',
        'mnav.menu': 'メニュー・価格',
        'mnav.story': '私たちのストーリー',
        'mnav.dietary': 'ハラル認証・アレルギー',
        'mnav.faq': 'FAQ',
        'mnav.cta': '本日の場所を見る',
        'toggle.lang': 'EN',

        // Footer
        'foot.contact': 'お問い合わせ・ご予約',
        'foot.follow': 'トラックをフォロー',
        'foot.followDesc': '毎朝の営業場所の更新や限定バッチ、季節のメニュー情報をお届けします。',
        'foot.brandDesc':
            '札幌発の100%ハラル・チリドッグフードトラック。じっくり煮込んだビーフと北海道産ミルクパンで、心のこもった一杯を。',
        'foot.halal': 'ハラル認証キッチンオンホイール',
        'foot.rights': '© 2026 キタハラルチリドッグス札幌 All rights reserved.',
        'foot.handcrafted': '100%ハラル認証ビーフ使用 • 北海道・日本',

        // Section headings (eyebrow + title)
        'loc.eyebrow': '営業スケジュール',
        'loc.title': '本日のトラックの場所',
        'loc.sub': '鮮やかなオレンジのトラックが、水曜から日曜まで札幌中心部の公園や広場を巡ります。',
        'loc.liveStatus': '営業ステータス',
        'loc.freshBatches': '45分ごとに作りたてを提供',
        'loc.openNow': '営業中',
        'loc.spotDetails': '開催場所:',
        'loc.transitAccess': 'アクセス:',
        'loc.mapTitle': 'フードトラックの場所マップ',
        'loc.restingTitle': '本日はお休みです',
        'loc.restingDesc':
            'キッチンでは次の営業に向けてビーフチリをじっくり煮込み、北海道産のバンズを仕入れています。本日の路上での営業予定はありません。',
        'loc.nextService': '次の営業:',
        'menu.eyebrow': '毎日手作り',
        'menu.title': 'メニュー・価格',
        'about.eyebrow': '創業の物語・ミッション',
        'about.title': '札幌初のハラル・チリドッグトラックをつくった理由',
        'allergen.eyebrow': '透明性とこだわり',
        'allergen.title': 'アレルギー・食事情報',
        'faq.eyebrow': '質問と回答',
        'faq.title': 'よくある質問',

        // ---- Admin (shared locale) ----
        'admin.nav.dashboard': 'ダッシュボード',
        'admin.nav.locations': '営業場所',
        'admin.nav.menu': 'メニュー',
        'admin.nav.accounts': 'アカウント',
        'admin.profile': 'プロフィール',
        'admin.logout': 'ログアウト',
        'admin.page.dashboard': 'ダッシュボード',
        'admin.page.locations': '営業カレンダー',
        'admin.page.menu': 'メニュー管理',
        'admin.page.accounts': '管理者アカウント',

        'admin.dash.locTitle': '営業カレンダー',
        'admin.dash.locDesc': '本日の営業場所とトラックのスケジュールを管理します。',
        'admin.dash.menuTitle': 'メニュー管理',
        'admin.dash.menuDesc': 'メニュー、価格、表示設定、おすすめ商品を管理します。',
        'admin.dash.accTitle': '管理者アカウント',
        'admin.dash.accDesc': '他の管理者アカウントの追加・削除を行います。',
        'admin.manage.locations': '営業場所を管理 →',
        'admin.manage.menu': 'メニューを管理 →',
        'admin.manage.accounts': 'アカウントを管理 →',
        'admin.dash.tip': 'ヒント: 初期パスワードのままの場合は、',
        'admin.dash.profile': 'プロフィール',

        'admin.loc.addTitle': '営業を追加',
        'admin.loc.editTitle': '営業を編集',
        'admin.loc.legend.stop': '営業',
        'admin.loc.legend.event': 'イベント',
        'admin.loc.legend.cancelled': '中止',

        'admin.saveStop': '営業を保存',
        'admin.saveChanges': '変更を保存',
        'admin.saving': '保存中…',
        'admin.cancelEdit': '編集をキャンセル',
        'admin.cancelStop': '営業を中止',
        'admin.addItem': 'アイテムを追加',
        'admin.addMenuItem': 'メニューアイテムを追加',
        'admin.newItem': '新規作成',
        'admin.edit': '編集',
        'admin.delete': '削除',
        'admin.feature': 'おすすめ設定',
        'admin.hide': '非表示',
        'admin.show': '表示',
        'admin.soldOut': '売り切れ',
        'admin.restock': '再入荷',
        'admin.items': 'アイテム',
        'admin.you': 'あなた',
        'admin.adding': '追加中…',
        'admin.addAccount': 'アカウントを追加',
        'admin.addAdminAccount': '管理者アカウントを追加',
        'admin.existingAccounts': '登録済みアカウント',
        'admin.th.name': '名前',
        'admin.th.email': 'メール',
        'admin.th.actions': '操作',
        'admin.menuEmpty': 'まだメニューがありません。フォームから最初のアイテムを追加してください。',

        // ---- Auth (guest/login) ----
        'auth.logInTitle': 'ログイン',
        'auth.welcomeBack': 'おかえりなさい',
        'auth.signInHint': 'キタチリドッグスの管理画面にログインします。',
        'auth.email': 'メールアドレス',
        'auth.password': 'パスワード',
        'auth.remember': 'ログイン状態を保持する',
        'auth.forgot': 'パスワードをお忘れですか？',
        'auth.logIn': 'ログイン',
        'auth.signingIn': 'ログイン中…',
        'auth.tagline': '札幌 • ハラルストリートフード',

        // Forgot / reset password
        'auth.forgotTitle': 'パスワードをお忘れですか',
        'auth.forgotIntro':
            'パスワードをお忘れですか？問題ありません。ご登録のメールアドレスを入力してください。パスワード再設定用のリンクをお送りします。',
        'auth.forgotSubmit': 'パスワード再設定リンクを送信',

        // Register
        'auth.registerTitle': '新規登録',
        'auth.createAccount': 'アカウントを作成',
        'auth.registerHint': '登録して始めましょう。',
        'auth.name': '名前',
        'auth.confirmPassword': 'パスワード（確認）',
        'auth.alreadyRegistered': 'すでに登録済みですか？',
        'auth.register': '登録',
        'auth.registering': '登録中…',
    },
};

const stored =
    typeof localStorage !== 'undefined' ? localStorage.getItem('kita-locale') : null;
const startLocale = stored && messages[stored] ? stored : 'en';

export const i18n = reactive({
    locale: startLocale,
    messages,
});

export function t(key) {
    const table = i18n.messages[i18n.locale] || {};
    const value = table[key];
    if (value !== undefined) return value;
    return messages.en[key] ?? key;
}

export function toggleLocale() {
    const next = i18n.locale === 'ja' ? 'en' : 'ja';
    i18n.locale = next;
    if (typeof localStorage !== 'undefined') localStorage.setItem('kita-locale', next);
    if (typeof document !== 'undefined') document.documentElement.lang = next;
}
