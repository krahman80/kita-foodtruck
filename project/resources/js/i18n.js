import { reactive } from 'vue';
import axios from 'axios';

// Lightweight i18n. Japanese is the primary language and English is
// supplementary, so 'ja' is the default and 'en' is the fallback for any key
// missing from the JA table.
//
// DB-driven content (locations/menu) is intentionally left as-is: it is
// authored in Japanese by the client and is never a translation target.

const messages = {
    en: {
        // Document metadata + accessibility
        // The brand is appended to every page title by app.js, so it is not repeated here.
        'meta.title': 'Halal Chili Dog Food Truck in Sapporo',
        'meta.description':
            "Sapporo's 100% halal-certified chili dog food truck. Slow-simmered beef chili, Hokkaido milk buns, and today's location updated daily.",
        'meta.keywords':
            'halal food truck Sapporo, halal chili dog, halal food Japan, chili dog food truck, halal street food Sapporo',
        'a11y.toggleMenu': 'Toggle navigation menu',
        'a11y.langToEn': 'Switch to English',
        'a11y.langToJa': 'Switch to Japanese',

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
        'foot.base': 'Mobile Base: Chuo Ward, Sapporo, Hokkaido 060-0042, Japan',
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

        // ---- Public sections: hero, location, menu ----
        'hero.fallbackTitle': 'Slow-Simmered Halal Chili & Hokkaido Brioche',
        'hero.fallbackDesc':
            'Steamed-to-order halal beef franks topped with 12-hour spiced chili con carne, freshly grated Hokkaido cheddar, and locally baked toasted milk buns.',
        'hero.ctaPrimary': "See Today's Location",
        'hero.ctaSecondary': 'Explore Menu (¥)',
        'hero.fact1': '100% Halal Certified Beef',
        'hero.fact2': 'Zero Pork & Zero Alcohol',
        'hero.fact3': 'Fresh Buns Baked Daily',
        'hero.mostPopular': 'Most Popular',
        'hero.truckAlt': 'The Kita Halal Chili Dogs food truck serving customers in a Sapporo park',

        // Sentences with placeholders: word order differs per language, so these
        // must never be assembled from concatenated fragments.
        'loc.headline': "{date} — Today we'll be at {name}{landmark}, from {from} to {to}",
        'loc.nextLabel': '{date} at {where}',

        'menu.subtitle':
            'Every sausage is certified 100% halal beef, topped with slow-reduced chili con carne and paired with toasted artisan milk buns. All prices in Japanese Yen (¥), tax inclusive.',
        'menu.kitchenBadge': 'Muslim Friendly Kitchen',
        'menu.emptyTitle': 'Menu coming soon',
        'menu.emptyDesc':
            "We're still finalizing our menu. Check back shortly for full listings and prices.",
        'menu.comboSpecial': 'Truck Combo Special:',
        'menu.comboAddOn': 'Add extra creamy cheese to any dog for just',
        'menu.orderCta': 'Order at the Window',
        'menu.soldOut': 'Sold Out',

        'spice.mild': 'Mild',
        'spice.medium': 'Medium',
        'spice.hot': 'Hot',
        'spice.tangy': 'Tangy',
        'spice.title': '{label} Spice',

        'badge.limitedBatch': 'Limited Daily Batch',
        'badge.muslimFriendly': 'Muslim Friendly',
        'badge.muslimFriendlyCertified': 'Muslim Friendly Certified',

        // ---- Long-form content: About / Allergen / FAQ ----
        // One key per sentence. Inline markup is deliberately absent: a tag inside
        // a sentence cannot survive translation, because word order moves.
        'about.body1':
            'Our story began in the winter of 2022 during the Sapporo Snow Festival. Tariq, an architecture graduate student living in Hokkaido, and Kenji, a native Sapporo chef who trained in rustic comfort cooking, stood watching international travelers and Muslim residents search fruitlessly for hearty, warm street food that honored strict dietary principles.',
        'about.body2':
            '"In a city famous across the world for rich ramen and winter markets, almost everything contained pork bones, lard, or mirin," recalls Tariq. "We wanted to create a welcoming curb where anyone—Muslim travelers, local families, and chili dog purists alike—could bite into something warm, deeply satisfying, and completely worry-free."',
        'about.body3':
            'We restored a 1994 Japanese step van, painted it in warm retro orange with clean white trim, and spent eleven months perfecting our slow-simmered beef chili con carne. We source certified halal beef brisket and Hokkaido cheddar, and pair them with custom-steamed milk buns baked each morning by an artisan bakery in central Sapporo.',
        'about.body4':
            'No shortcuts. No industrial fillers. Just patient craftsmanship and honest hospitality on wheels.',
        'about.captionName': 'Kenji Sato & Tariq Al-Mansoor',
        'about.captionRole': 'Co-founders & Head Cooks, Kita Halal Chili Dogs Sapporo',
        'about.photoAlt':
            'Kenji and Tariq, co-founders and chefs of Kita Halal Chili Dogs inside their Sapporo food truck kitchen',
        'about.pillar1Value': '100%',
        'about.pillar1Label': 'Halal Sourced',
        'about.pillar1Desc': 'Every cut of beef rigorously certified.',
        'about.pillar2Value': '12 Hrs',
        'about.pillar2Label': 'Slow Simmer',
        'about.pillar2Desc': 'Rich depth of cumin, garlic & chilies.',
        'about.pillar3Value': 'Local',
        'about.pillar3Label': 'Hokkaido Buns',
        'about.pillar3Desc': 'Baked fresh daily in Sapporo.',

        'allergen.intro':
            'We take kitchen integrity and guest safety seriously. Below is an honest breakdown of our sourcing, preparation methods, and allergen management.',
        'allergen.card1Title': '100% Halal Sourcing Guarantee',
        'allergen.card1Body':
            'All beef used in our sausages and chili con carne is procured from licensed Halal-certified suppliers. Prepared using ingredients and seasonings made without pork, lard, or alcohol. We do not use cooking wine, sake, or mirin in any sauces or seasonings.',
        'allergen.card1Foot': 'Halal certification documents are available at the truck counter upon request.',
        'allergen.card2Title': 'Gluten & Wheat Buns',
        'allergen.card2Body':
            'Our standard brioche buns are made from wheat flour and contain gluten. For guests avoiding gluten, we gladly offer any chili dog served as a "Lettuce-Boat Dog" wrapped in fresh, crisp Hokkaido romaine leaves at no extra charge. Our chili sauce itself is gluten-free.',
        'allergen.card2Foot': 'Please notify the order window if you require lettuce-wrap preparation.',
        'allergen.card3Title': 'Dairy & Cheese Allergens',
        'allergen.card3Body':
            "Our cheddar melt dog features cheese made with pasteurized Hokkaido cow's milk. In addition, our standard buns are gently toasted with a touch of butter. If you have a dairy allergy or lactose intolerance, simply ask for \"Dairy-Free Preparation\"—we will toast your bun dry or provide a lettuce wrap with dairy-free chili.",
        'allergen.card3Foot':
            'The Classic Chili Dog can be prepared without cheese to make it dairy-free.',
        'allergen.card4Title': 'Nut-Free & Shellfish-Free Kitchen',
        'allergen.card4Body':
            'Formulated without peanuts or tree nuts. Seafood and shellfish are not handled on site. Guests with severe allergies are encouraged to speak with staff.',
        'allergen.card4Foot': 'Frying oil for fries is 100% vegetable oil and never shared with animal proteins.',
        'allergen.contact':
            'Have a specific dietary concern not listed above? Please speak directly with our head cook at the window or send an email prior to visiting.',

        'faq.subtitle':
            'Everything you need to know about finding our truck and enjoying our halal menu in Sapporo.',
        'faq.q1': 'Where can I find and buy from your food truck?',
        'faq.a1':
            'Our food truck operates across designated public spots in central Sapporo from Wednesday through Sunday. Typical regular locations include Odori Park (Block 6), Sapporo Station North Plaza, and Maruyama Park entrance during festival weekends. You can check the live location module at the top of this website or follow our Instagram stories (@kitachilidogs_sapporo), which update at 9:00 AM each morning with the exact GPS pin and opening hours.',
        'faq.q2': 'What ingredients are used in your chili dogs and buns?',
        'faq.a2':
            'Our chili is made from coarse-ground 100% Halal beef brisket, stewed for 12 hours with tomatoes, sweet Hokkaido onions, roasted garlic, toasted cumin, Mexican ancho peppers, and smoked paprika. Our sausages are casing-stuffed 100% halal beef franks. The buns are custom brioche baked daily using wheat flour, water, yeast, a touch of butter, and Hokkaido milk. We do not use pork fat or artificial preservatives.',
        'faq.q3': 'How is your beef certified Halal?',
        'faq.a3':
            'All raw beef cuts are procured with formal Halal compliance certificates issued by Halal Media Japan. All equipment, steamers, and griddles on our truck are dedicated exclusively to halal beef and vegetarian side items.',
        'faq.q4': 'What payment methods do you accept at the food truck window?',
        'faq.a4':
            'We accept Japanese Yen cash (¥), Japanese transit IC cards (Kitaca, Suica, Pasmo, Icoca), PayPay QR payment, and major credit/debit cards (Visa, Mastercard, American Express, JCB) via contactless tap to pay.',
        'faq.q5': 'Can we book the orange truck for university festivals or private events?',
        'faq.a5':
            'Yes! We frequently cater at Hokkaido University events, international cultural fairs, ski lodge pop-ups, and corporate retreats around Sapporo and Otaru. Please reach out via our contact email at least two weeks in advance with your expected guest count.',

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
        'admin.featured': 'Featured',
        'admin.active': 'Active',
        'admin.inactive': 'Inactive',
        'admin.imageReadError': 'Could not read that image. Please choose a JPG, PNG, or WebP file.',
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

        'auth.name': 'Name',
        'auth.confirmPassword': 'Confirm Password',
    },

    ja: {
        // 文書メタデータ・アクセシビリティ
        // ブランド名は app.js が全ページのタイトルに付与するため、ここでは繰り返さない。
        'meta.title': '札幌のハラルチリドッグス フードトラック',
        'meta.description':
            '札幌を中心に営業する100%ハラル認証のチリドッグフードトラック。じっくり煮込んだビーフチリと北海道産バンズをお届けします。本日の営業場所とメニューは毎日更新。',
        'meta.keywords':
            'ハラル フードトラック 札幌, ハラル チリドッグ, 札幌 ハラル, ハラル 日本, ムスリム フレンドリー 札幌',
        'a11y.toggleMenu': 'ナビゲーションを開閉する',
        'a11y.langToEn': '英語に切り替える',
        'a11y.langToJa': '日本語に切り替える',

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
        'foot.rights': '© 2026 キタハラルチリドッグス',
        'foot.base': '本拠地：北海道札幌市中央区 060-0042',
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

        // ---- 公開セクション（ヒーロー・営業場所・メニュー） ----
        'hero.fallbackTitle': 'じっくり煮込んだハラルビーフチリと北海道産ブリオッシュ',
        'hero.fallbackDesc':
            '注文ごとに蒸し上げたハラルビーフソーセージに、12時間煮込んだチリコンカン、北海道産チェダーチーズ、焼きたてのミルクバンズを合わせた一品。',
        'hero.ctaPrimary': '本日の営業場所を見る',
        'hero.ctaSecondary': 'メニューを見る（¥）',
        'hero.fact1': '100%ハラル認証ビーフ使用',
        'hero.fact2': 'ポーク・アルコール不使用',
        'hero.fact3': 'バンズは毎日焼きたて',
        'hero.mostPopular': '一番人気',
        'hero.truckAlt': '札幌の公園で営業するキタハラルチリドッグスのフードトラック',

        // 語順が言語ごとに異なるため、断片を連結せずプレースホルダーで組み立てる。
        'loc.headline': '{date} — 本日は{name}{landmark}にて{from}〜{to}で営業します',
        'loc.nextLabel': '{date} {where}',

        'menu.subtitle':
            'ソーセージはすべて100%ハラル認証ビーフ。じっくり煮詰めたチリコンカンと、こんがり焼いたミルクバンズを合わせています。価格はすべて日本円（¥）・税込です。',
        'menu.kitchenBadge': 'ムスリムフレンドリーキッチン',
        'menu.emptyTitle': 'メニュー公開準備中',
        'menu.emptyDesc': '現在メニューを準備しています。公開まで今しばらくお待ちください。',
        'menu.comboSpecial': 'トラック限定コンボ：',
        'menu.comboAddOn': '追加チーズ',
        'menu.orderCta': '窓口でご注文ください',
        'menu.soldOut': '売り切れ',

        'spice.mild': 'まろやか',
        'spice.medium': '中辛',
        'spice.hot': '辛口',
        'spice.tangy': '酸味',
        'spice.title': '辛さ: {label}',

        'badge.limitedBatch': '1日限定',
        'badge.muslimFriendly': 'ムスリムフレンドリー',
        'badge.muslimFriendlyCertified': 'ムスリムフレンドリー認証',

        // ---- 長文コンテンツ（ストーリー・アレルギー・FAQ） ----
        // 一文につき1キー。文中にタグを埋め込むと、語順が変わる言語では
        // 成立しないため、強調タグは使用しない。
        'about.body1':
            '私たちの物語は、2022年の冬、さっぽろ雪まつりの時期に始まりました。北海道で建築を学ぶ大学院生だったタリクと、札幌生まれで家庭料理を修めた料理人のケンジは、海外からの旅行者とムスリムの住民が、厳格な食の決まりを守りながら、温かく食べ応えのある屋台料理を必死に探し続けている姿を見ていました。',
        'about.body2':
            '「世界に名高い濃厚なラーメンと冬の市場で知られるこの街で、ほぼすべての料理に豚骨やラード、みりんが使われていました」とタリクは振り返ります。「ムスリムの旅行者も、地元の家族も、チリドッグ好きも、誰もが安心して温かいものを頬張れる。そんな場所をつくりたかったんです」',
        'about.body3':
            '私たちは1994年製の日本車ステップバンを再生し、温かみのあるレトロなオレンジと白いトリムで塗り直し、11か月をかけて、じっくり煮込むビーフチリコンカンを仕上げました。ハラル認証の牛ブリスケットと北海道産チェダーを仕入れ、札幌中心部の職人ベーカリーが毎朝焼き上げる特注のミルクバンズと合わせています。',
        'about.body4':
            '手抜きはしません。工業的なつなぎも使いません。あるのは、丁寧な仕事と、車輪の上の誠実なおもてなしだけです。',
        'about.captionName': 'Kenji Sato & Tariq Al-Mansoor',
        'about.captionRole': 'キタハラルチリドッグス 共同創業者・ヘッドシェフ',
        'about.photoAlt':
            '札幌のフードトラックのキッチンに立つ、キタハラルチリドッグスの共同創業者ケンジとタリク',
        'about.pillar1Value': '100%',
        'about.pillar1Label': 'ハラル認証',
        'about.pillar1Desc': '使用する牛肉はすべて厳格に認証。',
        'about.pillar2Value': '12時間',
        'about.pillar2Label': 'じっくり煮込み',
        'about.pillar2Desc': 'クミン・ガーリック・チリの深いコク。',
        'about.pillar3Value': '地元',
        'about.pillar3Label': '北海道産バンズ',
        'about.pillar3Desc': '札幌で毎日焼きたて。',

        'allergen.intro':
            '私たちは、キッチンの管理体制とお客様の安全を何よりも大切にしています。仕入れ、調理方法、アレルギー対応について、正直にご説明します。',
        'allergen.card1Title': '100%ハラル調達の保証',
        'allergen.card1Body':
            'ソーセージとチリコンカンに使用する牛肉はすべて、ハラル認証を受けた正規サプライヤーから仕入れています。豚肉・ラード・アルコールを使用せずにつくられた食材と調味料を使用しています。ソースや調味料に料理酒、日本酒、みりんは使用していません。',
        'allergen.card1Foot': 'ハラル認証書は、ご希望があればトラックの窓口でご提示します。',
        'allergen.card2Title': 'グルテン・小麦について',
        'allergen.card2Body':
            '標準のブリオッシュバンズは小麦粉を使用しており、グルテンを含みます。グルテンを避けたいお客様には、どのチリドッグも、北海道産ロメインレタスで包んだ「レタスボートドッグ」に無料でおつくりします。チリソース自体はグルテンフリーです。',
        'allergen.card2Foot': 'レタス包みをご希望の場合は、ご注文時に窓口へお申し付けください。',
        'allergen.card3Title': '乳製品・チーズについて',
        'allergen.card3Body':
            'チェダーチーズドッグには、北海道産の殺菌済み牛乳でつくられたチーズを使用しています。また、標準のバンズは、バターを少し使って軽くトーストしています。乳アレルギーや乳糖不耐症の方は、「乳製品不使用」とお申し付けください。バンズをバターなしで焼くか、乳製品不使用のチリとレタス包みでご用意します。',
        'allergen.card3Foot': 'クラシックチリドッグは、チーズを省いて乳製品不使用でご用意できます。',
        'allergen.card4Title': 'ナッツ・甲殻類を使用しないキッチン',
        'allergen.card4Body':
            'ピーナッツおよび木の実類は使用せずに調理しています。魚介類・甲殻類は当キッチンでは取り扱っていません。重度のアレルギーをお持ちのお客様は、スタッフへお申し出ください。',
        'allergen.card4Foot': 'フライドポテトの揚げ油は100%植物油で、動物性たんぱく質とは共用していません。',
        'allergen.contact':
            '上記にない食事のご不安がある場合は、窓口で料理長に直接おたずねいただくか、ご来店前にお問い合わせください。',

        'faq.subtitle': '札幌で当トラックを見つけて、ハラルメニューを楽しむために必要な情報をまとめました。',
        'faq.q1': 'フードトラックの場所と購入方法を教えてください。',
        'faq.a1':
            '当フードトラックは、水曜日から日曜日まで、札幌中心部の指定された公共スペースで営業しています。通常は大通公園（6丁目）、札幌駅北口広場、イベントのある週末は円山公園入口などに出店します。正確な位置情報と営業時間は、毎朝9時に更新される当サイト上部の営業情報、またはInstagramストーリー（@kitachilidogs_sapporo）でご確認いただけます。',
        'faq.q2': 'チリドッグとバンズには、どんな材料を使っていますか？',
        'faq.a2':
            'チリは、粗挽きの100%ハラル認証牛ブリスケットを12時間煮込み、トマト、北海道産の甘い玉ねぎ、ローストガーリック、焙煎クミン、メキシコ産アンチョペッパー、スモークパプリカを加えてつくっています。ソーセージは、100%ハラル認証ビーフのケーシング詰めフランクです。バンズは、小麦粉・水・イースト・少量のバター・北海道産牛乳で毎日焼き上げる特注のブリオッシュです。豚脂や人工保存料は使用していません。',
        'faq.q3': '牛肉のハラル認証は、どのように取得していますか？',
        'faq.a3':
            'すべての牛肉は、Halal Media Japan が発行するハラル適合証明書付きで仕入れています。トラック内の器具、蒸し器、鉄板はすべて、ハラル牛肉とベジタリアン向けサイドメニュー専用です。',
        'faq.q4': '支払い方法を教えてください。',
        'faq.a4':
            '現金（円）、交通系ICカード（Kitaca・Suica・Pasmo・Icoca）、PayPay、および主要なクレジット・デビットカード（Visa・Mastercard・American Express・JCB）のタッチ決済をご利用いただけます。',
        'faq.q5': '大学祭やイベントにトラックを出店してもらえますか？',
        'faq.a5':
            'はい。北海道大学のイベント、国際文化交流フェア、スキー場でのポップアップ、札幌・小樽周辺での企業研修など、これまでも多数ご依頼いただいています。ご希望の人数とあわせて、遅くとも2週間前までにメールでお問い合わせください。',

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

        // Admin: location form fields (staff screens are JA-only)
        'admin.brandSub': '管理画面・札幌',
        'admin.loc.date': '日付',
        'admin.loc.locationName': '場所名',
        'admin.loc.address': '住所',
        'admin.loc.landmarkNote': '目印',
        'admin.loc.startTime': '開始時刻',
        'admin.loc.endTime': '終了時刻',
        'admin.loc.onMap': '地図上の位置',
        'admin.loc.onMapHint': '地図をクリックして緯度・経度を設定するか、以下に直接入力してください。',
        'admin.loc.latitude': '緯度',
        'admin.loc.longitude': '経度',
        'admin.loc.mapPinNote': 'ピンのメモ',
        'admin.loc.transitNote': 'アクセス',
        'admin.loc.isEvent': 'この営業はイベント',
        'admin.loc.eventName': 'イベント名',
        'admin.loc.pickDate': 'カレンダーで日付を選ぶと入力できるようになります。',
        'admin.loc.pastReadOnly': '過去の日付は閲覧のみです。今後の営業予定を登録してください。',

        // Admin: menu form fields and list actions (staff screens are JA-only)
        'admin.field.name': '名前',
        'admin.field.price': '価格（¥）',
        'admin.field.description': '説明',
        'admin.field.image': '画像',
        'admin.field.imageOptional': '（編集時は任意）',
        'admin.field.imageAlt': '画像の代替テキスト',
        'admin.field.spiceLevel': '辛さ',
        'admin.field.category': 'カテゴリ',
        'admin.field.badge': 'バッジ',
        'admin.field.displayOrder': '表示順',
        'admin.field.highlightTag1': 'ハイライト1',
        'admin.field.highlightTag2': 'ハイライト2',
        'admin.field.active': '公開する（サイトに表示）',
        'admin.field.soldOut': '売り切れ',
        'admin.imagePreviewAlt': '選択した画像のプレビュー',
        'admin.currentImageAlt': '現在の画像',
        'admin.replaceImageHint': '現在の画像 — 変更する場合は新しいファイルを選択してください。',
        'admin.option.chiliDog': 'チリドッグ',
        'admin.option.drink': 'ドリンク',
        'admin.option.halalStandard': 'ハラル標準',
        'admin.option.limitedBatch': '1日限定バッチ',
        'admin.option.none': 'なし',
        'admin.confirmDelete': 'アカウント「{name}」（{email}）を削除しますか？',

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
        'admin.featured': 'おすすめ',
        'admin.active': '公開中',
        'admin.inactive': '非公開',
        'admin.imageReadError': '画像を読み込めませんでした。JPG・PNG・WebP のいずれかを選択してください。',
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
        'auth.signInHint': 'キタハラルチリドッグスの管理画面にログインします。',
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

        'auth.name': '名前',
        'auth.confirmPassword': 'パスワード（確認）',

        // パスワード再設定・確認・メール確認（スタッフ専用画面）
        'auth.resetTitle': 'パスワード再設定',
        'auth.resetSubmit': 'パスワードを再設定する',
        'auth.confirmTitle': 'パスワードの確認',
        'auth.confirmIntro': 'この操作にはパスワードの確認が必要です。続行する前にパスワードを入力してください。',
        'auth.confirmSubmit': '確認する',
        'auth.verifyTitle': 'メールアドレスの確認',
        'auth.verifyIntro':
            'ご登録ありがとうございます。開始前に、お送りしたメールのリンクからメールアドレスを確認してください。メールが届いていない場合は、再送できます。',
        'auth.verifySent': 'ご登録のメールアドレスに、新しい確認リンクを送信しました。',
        'auth.verifyResend': '確認メールを再送する',
        'auth.logOut': 'ログアウト',

        // プロフィール（スタッフ専用画面）
        'profile.pageTitle': 'プロフィール',
        'profile.brandSub': 'プロフィール・札幌',
        'profile.navDashboard': 'ダッシュボード',
        'profile.infoTitle': 'プロフィール情報',
        'profile.infoDesc': 'アカウントのプロフィール情報とメールアドレスを更新します。',
        'profile.unverified': 'メールアドレスが未確認です。',
        'profile.resendVerification': '確認メールを再送する',
        'profile.verificationSent': '新しい確認リンクをメールアドレスに送信しました。',
        'profile.save': '保存する',
        'profile.saved': '保存しました。',
        'profile.passwordTitle': 'パスワードの変更',
        'profile.passwordDesc': '安全のため、長くランダムなパスワードを設定してください。',
        'profile.currentPassword': '現在のパスワード',
        'profile.newPassword': '新しいパスワード',
        'profile.deleteTitle': 'アカウントの削除',
        'profile.deleteDesc':
            'アカウントを削除すると、すべてのデータが完全に削除されます。削除する前に、保存しておきたいデータがあればダウンロードしてください。',
        'profile.deleteConfirm': '本当にアカウントを削除しますか？',
        'profile.deleteConfirmDesc':
            'アカウントを削除すると、すべてのデータが完全に削除されます。確認のためパスワードを入力してください。',
        'profile.cancel': 'キャンセル',
        'profile.deleteSubmit': 'アカウントを削除する',
    },
};

const DEFAULT_LOCALE = 'ja';
const LOCALES = ['ja', 'en'];

/** Must match the route declared in routes/web.php. */
const PERSIST_ROUTE = '/locale';

export const i18n = reactive({
    locale: DEFAULT_LOCALE,
    messages,
});

const normalize = (locale) => (LOCALES.includes(locale) ? locale : DEFAULT_LOCALE);

/**
 * Seed the client from the locale the server rendered with, so `<html lang>`,
 * validation messages and the visible labels cannot disagree.
 */
export function initLocale(locale) {
    i18n.locale = normalize(locale);
    document.documentElement.lang = i18n.locale;
}

/** Replace {placeholder} tokens. Needed for sentences, not just labels. */
function interpolate(message, params) {
    if (!params) return message;

    return message.replace(/\{(\w+)\}/g, (match, key) =>
        Object.prototype.hasOwnProperty.call(params, key) ? String(params[key]) : match,
    );
}

export function t(key, params) {
    const value = i18n.messages[i18n.locale]?.[key] ?? messages.en[key];

    return value === undefined ? key : interpolate(value, params);
}

/**
 * Switch language and record the choice server-side.
 *
 * The switch itself is reactive and instant; the request exists only so that
 * server-generated text (validation errors, auth errors, mail) and the
 * `<html lang>` attribute follow the same locale. It is deliberately not
 * awaited, and the promise is swallowed: a failed preference write must never
 * surface as a broken toggle.
 *
 * The cookie cannot be written directly from JavaScript — Laravel's
 * EncryptCookies discards values it cannot decrypt — hence the round trip.
 */
export function toggleLocale() {
    i18n.locale = i18n.locale === 'ja' ? 'en' : 'ja';
    document.documentElement.lang = i18n.locale;

    axios.post(PERSIST_ROUTE, { locale: i18n.locale }).catch(() => {});
}

/**
 * Format an amount in yen for the active locale.
 *
 * Yen has no minor unit and both ja and en group with commas, so the output is
 * identical today — but keeping it in one place means a currency or locale
 * change does not need editing every price call site.
 */
export function yen(amount) {
    return `¥${Number(amount).toLocaleString(i18n.locale === 'ja' ? 'ja-JP' : 'en-US')}`;
}
