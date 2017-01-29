'use strict'
import { UtilLocale }  from "../../patternlibrary/js/util/UtilLocale";

/**
 * Classes extension
 **/
interface LocaleFormat {
 en: LocaleSubFormat;
 my: LocaleSubFormat;
 [key: string]: LocaleSubFormat;
};

interface LocaleSubFormat {
 [key: string]: string;
};

export abstract class AbstractLocale {
  protected abstract getData():LocaleFormat;

  public translate(key: string): string {
    const langTranslated = this.getData();
    return langTranslated[this.getLocale()][key];
  }

  public translateAll():LocaleSubFormat {
    const langTranslated = this.getData();
    return langTranslated[this.getLocale()]
  }

  private getLocale():string {
    const lang = UtilLocale.extractLanguageFromPath();
    return lang;
  }
}

export class HeaderLocale extends AbstractLocale {
  private lang:LocaleFormat = {
    en: {
      'title': 'A DEVELOPER SITE'
    },
    my: {
      'title': 'TAPAK PEMAJU'
    }
  };

  public getData():LocaleFormat {
    return this.lang;
  }
}

export class FooterLocale extends AbstractLocale {
  private lang:LocaleFormat = {
    en: {
      'about': 'About',
      'blog': 'Blog',
      'develop': 'Development',
      'tech': 'Technology',
      'contactus': 'Contact Us',
      'contactus.title': 'CONTACT US VIA EMAIL',
      'contactus.msg': 'We will gladly reply your email once received. Please be patient with us.'
    },
    my: {
      'about': 'Berkenalan',
      'blog': 'Blog',
      'develop': 'Pembinaan',
      'tech': 'Teknologi',
      'contactus': 'Hubungi Kami',
      'contactus.title': 'HUBUNGI KAMI MELALUI EMAIL',
      'contactus.msg': 'Kami akan hubungi and selepas menerima email anda. Sila bersabar dengan kami.'
    }
  };

  public getData():LocaleFormat {
    return this.lang;
  }
}

export class DevelopLocale extends AbstractLocale {
  private lang:LocaleFormat = {
    en: {
      'title': 'Website Development',
      'intro': 'Introduction',
      'desc.1': 'The Walcron Coorperation web site has to become a website rich learning resource, based on known front-end framework or libraries.The ultimate goal for us, is to achieve an out-of-work-environment development.',
      'desc.2': 'This website has gone through it\'s 4th iteration with usage of different frameworks or libraries. The UX has gone through various changes as well. Each rewrite of the website is rewritten from scratch, this is to avoid dependencies stacked from previous projects; with the exception of the "About Me" page. For every new iteration made, it does however inherits good traits and characteristics from the previous iterations.',
      'first': 'The First',
      'first.text': 'As a start-off, the site was wrote in vanillaJS. The site was ported from Tomcat to Wildfly, JBoss to vert.x web servers. The latter created the realization on importance on non-block I/O services, which marks for 2nd iteration.',
      'second': 'Second Iteration',
      'second.text': 'Again the second site was wrote with vanillaJS, but few new features were added in. Firstly it ran on NodeJS and the site is already using UX of parallax.However it was displaying some slow rendering.',
      'second.1.title': 'Startup',
      'second.1.desc': 'As the hosting cloud servers restarted every day, NodeJS speed startup, 2-3 seconds, saved our day.',
      'second.2.title': 'Styling',
      'second.2.desc': 'Introducing stylus/SASS to the page.',
      'second.3.title': 'Interactivity',
      'second.3.desc': 'With parallaxing, shows a smoother and more interactive user response.',
      'third': 'Third Iteration',
      'third.text': 'Rewrote under NodeJS again, but introduced a pattern library for JS/CSS references. A beta version of AngularJS 2 was used in some of the developed pages.',
      'third.1.title': 'Reference',
      'third.1.desc': 'Introducing pattern library with small JS modules which makes Javascript debugging easier. However, plugging into the main website becomes a problem.',
      'third.2.title': 'Experimental Technology',
      'third.2.desc': 'Even as beta, Angular 2 concept was good and easy and solve some of the pattern library plugging issues.',
      'third.3.title': 'Material Design',
      'third.3.desc': 'Rewriting material design from Google\'s material view into AngularJS 2 was challenging, but achieved it.',
      'third.4.title': 'Static Typings',
      'third.4.desc': 'Created JS modules are now static typed and sound checked when compiled.',
      'third.5.title': 'Library Loading',
      'third.5.desc': 'We mixed usage of CommonJS, AMD and ES6 loading modules in this iteration.',
      'third.6.title': 'Harmony',
      'third.6.desc': 'Created themes to create better harmonization.',
      'third.7.title': 'Routing',
      'third.7.desc': 'Used the famous Angular routing to create Single Page Access. This badly affects the SEO statistic, which is decidedly to be dropped in the fourth iteration.',
      'fourth': 'Fourth Iteration',
      'fourth.text': 'Given the experience with AngularJS2 and React Native in this iteration; we decided to go with ReactJS. The transition and the concept of ReactJS blow us out of the water, wow!',
      'fourth.1.title': 'Reference',
      'fourth.1.desc': 'Pattern Libraries\'s Plug and play using ReactJS and module creation concept into the main project is now easy and robust.',
      'fourth.2.title': 'Latest Technology',
      'fourth.2.desc': 'Pushing boundaries to use even PostCSS!',
      'fourth.3.title': 'Heaven of Plugins',
      'fourth.3.desc': 'React Libraries are vast and easy to grasp.',
      'fourth.4.title': 'Faster Library Loading',
      'fourth.4.desc': 'Improved loading even more with webpack bundling.',
      'fourth.5.title': 'Modular',
      'fourth.5.desc': 'Everything was broken into small modules in patternlibrary, including CSS, making it extremely managable.'
    },
    my: {
      'title': 'Pembinaan Laman',
      'intro': 'Pengenalan',
      'desc.1': 'Laman web Walcron Coorperation mempunyai untuk menjadi laman yang kaya dengan ilmu, berdasarkan front-end framework dan library. Matlamat utama kami adalah untuk mencapai satu perkembangan yang tidak berkaitan dengan kerja kami.',
      'desc.2': 'Laman web ini telah dikitar sebanyak 4 kali dengan penggunaan framework atau library yang berbeza. UX juga melalui pelbagai perubahan. Setiap kali, laman ini di tulis semula dari permulaan, demi mengelakkan kebergantungan dari projek terdahulu; dengan pengecualian site "Kenalan". Setiap iterasi baru yang dibuat, terdapatnya sifat-sifat dan ciri-ciri baik yang diwarisi dari iterasi sebelumnya.',
      'first': 'Permulaan',
      'first.text': 'Sebagai permulaan, laman web ini dikodkan dengan penggunaan vanillaJS. Laman ini telah dialihkan dari Tomcat ke Wildfly, JBoss, kemudiannya ke vert.x pelayan web. Ciptaan akhir menyebabkan kesedaran mengenai kepentingan perkhidmantan tanpa I/O-block, yang menandakan untuk kitaran kedua.',
      'second': 'Iterasi Kedua',
      'second.text': 'Sekali lagi laman yang kedua ditulis dengan vanillaJS, tetapi beberapa ciri-ciri baru telah ditambah dalamnya. Pertama sekali, ia diintegrasi dengan NodeJS dan laman web ini telah mempergunakan UX parallax. Akan tetapi, kelajuan laman ini terjejas.',
      'second.1.title': 'Sistem dihidupkan',
      'second.1.desc': 'Laman ini dihostkan di cloud dan ia dimatikan setiap hari. NodeJS dapat dihidupkan dengan kelajuan, 2-3 saat, ini menyelamatkan laman kami.',
      'second.2.title': 'Styling',
      'second.2.desc': 'Memperkenalkan stylus/SASS ke laman ini.',
      'second.3.title': 'Interaktiviti',
      'second.3.desc': 'Dengan pengunaan parallaxing, terdapatnya interaktiviti dengan pengguna.',
      'third': 'Iterasi Ketiga',
      'third.text': 'Menulis semula mengunakan NodeJS, tetapi memperkenalkan \'pattern library\' untuk rujukan CSS dan JS. Versi beta AngularJS 2 telah digunakan dalam beberapa halaman ini.',
      'third.1.title': 'Rujukan',
      'third.1.desc': 'Menulis satu perpustakaan JS untuk rujukan. Javascript adalah lebih mudah di-debug dalam proses ini. Akan tetapi, plugin ke laman utama adalah satu masalah besar.',
      'third.2.title': 'Teknologi Experimen',
      'third.2.desc': 'Pengunaan versi beta Angular 2 dapat menyelesaikan masalah plug-in dalam pattern library.',
      'third.3.title': 'Material Design',
      'third.3.desc': 'Kami mengunakan library Material Design dari Google untuk memaparkan laman kita kepada pengunna. Menggunakan ia dengan AngularJS 2 memang mencabarkan.',
      'third.4.title': 'Static Typings',
      'third.4.desc': 'Javascript yang dikodkan sekarang diperiksa mengunakan pengkompile Typescript.',
      'third.5.title': 'Library Loading',
      'third.5.desc': 'Kami mencampurkan pengunaan CommonJS, AMD dan ES6 loading modules dalam iterasi ini.',
      'third.6.title': 'Harmoni',
      'third.6.desc': 'Mencipta tema supaya menwujudkan keharmonian yang lebih baik kepada penguna.',
      'third.7.title': 'Routing',
      'third.7.desc': 'Mengguna Angular routing yang terkenal untuk memcipta laman Single Page Access. Ini menjejaskan statistic SEO yang nyata, menyebabkan keperluan iterasi yang ke-4.',
      'fourth': 'Iterasi Keempat',
      'fourth.text': 'Memandangkan pengalaman dengan AngularJS2 dan React Native pada iterasi ini; kami mengambil keputusan untuk menggunakan ReactJS. Peralihan dan konsep ReactJS mengejutkan kami. Hidup React!',
      'fourth.1.title': 'Rujukan',
      'fourth.1.desc': 'Pattern Library Plug and Play menggunakan ReactJS dan konsep penciptaan modul ke dalam projek utama kini mudah dan mantap.',
      'fourth.2.title': 'Teknologi terbaru',
      'fourth.2.desc': 'Mengunakan teknologi baru, termasuk pug and POSTCSS.',
      'fourth.3.title': 'Plugin yang banyak',
      'fourth.3.desc': 'React Library yang banyak dan mudah digunakan.',
      'fourth.4.title': 'Library Loading yang cepat',
      'fourth.4.desc': 'Pengunaan webpack mencepatkan masa loading.',
      'fourth.5.title': 'Modular',
      'fourth.5.desc': 'Semua benda untuk laman ini dibuat dalam komponent kecil termasuk CSS.'
    }
  };

  public getData():LocaleFormat {
    return this.lang;
  }
}

export class IndexLocale extends AbstractLocale {
  private lang:LocaleFormat = {
    en: {
      'title.research': 'RESEARCH',
      'title.development': 'DEVELOPMENT',
      'title.leisure': 'LEISURE',
      'label.download': 'Download',
      'label.blog': 'Bragging Blog',
      'label.read': 'Read More',
      'post.1.title': 'Motives',
      'post.1.text': 'We are exploring latest technologies that can be implemented into any company. What is more to that, is that we are exploring the missing capabilities in most developers - <strong>a good full-stack developer.</strong>',
      'post.2.title': 'Free to surf',
      'post.2.text': 'We do not track you. We have even go thru extra lengths to translate this website without tracking anyone.',
      'post.3.title': 'Who we are',
      'post.3.text': 'Below explains throughly who we are and what we are exploring.',
      'card.1.title': 'Deep Learning',
      'card.1.desc': 'Won a hackaton, the team created an image scanning to identify a vehicle model using a mobile. We will be dedicating year 2017 to research deep learning using Scala programming language.',
      'card.2.title': 'Parallel Processings',
      'card.2.desc': 'Han had been focusing threading, but have not get a good grip on it yet. He had been programming in Scala, RxJS, Akka.'
            + ' Our ultimate goal now is having Apache Sparks with Deep Learning, working.',
      'card.3.title': 'Progressive App',
      'card.3.desc': 'An available offline webpage that still works offline without being online with precache! We need one seriously!',
      'card.4.title': 'UIUX',
      'card.4.desc': 'Studying on user interface and user experience. Ever notice that this page is parallax ?!',
      'card.5.title': 'React and Javascript',
      'card.5.desc': 'This website has went through 4 interations, and we are now using the ReactJS technology.' +
          ' Previously, we had been writing this in AngularJS, AngularJS2 and pure JS; but today, we\'re prefering ReactJS.' +
          ' This site\'s CSS is build based on CSS modules.',
      'card.6.title': 'React Native',
      'card.6.desc': 'Coding react native was an extremely wonderful experience as we learnt Android, iOS and Javascripts at the same time. ' +
          'The only problem we had is to override the main backdrop color. On our job basis, Han still writing native Android and iOS codes.' +
          'Advice to anyone writing React Native/Nativescript: it is very important to learn native language to harness it\'s potential.',
      'card.7.title': 'Scala, C# and Java',
      'card.7.desc': 'Han and Gladys have different programming preferences. Han likes opensources while Gladys likes Microsoft products.',
      'card.8.title': 'Deutsch from Malaysia',
      'card.8.desc': 'Wir lernen gemainsam am Wochenende Deutsch. Wir lieben Deutsch.',
      'card.9.title': 'Gladys\'s Journal',
      'card.9.desc': 'A journal Lee Wan kept, it\'s unfortunately not being updated as there\'s no followers on this.' +
          ' I guess nobody actually goes much to bloggin nowadays, ever since the born of facebook.'
    },
    my: {
      'title.research': 'PENYELIDIKAN',
      'title.development': 'PEMBINAAN',
      'title.leisure': 'MASA LAPANG',
      'label.download': 'Muat Turun',
      'label.blog': 'Bragging Blog',
      'label.read': 'Ketahui',
      'post.1.title': 'Motif',
      'post.1.text': 'Kami sedang meneroka teknologi yang boleh dilaksanakan di sebarang kompeni. Di samping it, kami mahu mengkaji keupayaan yang penting untuk setiap developer - <strong>full-stack developer yang baik.</strong>',
      'post.2.title': 'Layar dengan aman',
      'post.2.text': 'Kami tidak menjejaki anda. Kami menterjemahkan laman web ini tanpa session/cookie pengesanan.',
      'post.3.title': 'Siapa kami',
      'post.3.text': 'Dibawah menjelaskan kami dan apa yand sedang dikaji kami:',
      'card.1.title': 'Deep Learning',
      'card.1.desc': 'Memenangi hackaton, kumpulan kami mencipta sistem yang mengenali model kenderaan berdasarkan gambar yang diambil. Kami akan fokus dalam teknologi deep learning dalam tahun 2017.',
      'card.2.title': 'Proses dalam masa yang sama',
      'card.2.desc': 'Fokus Han adalah membina proses dengan multi-threading. Code dia difokus mengunakan Scala, RxJS, Akka.'
            + ' Matlamat utama kami sekarang adalah membolehkan Apache Sparks berjalan dengan Deep Learning.',
      'card.3.title': 'Aplikasi Progressive',
      'card.3.desc': 'Kami memerlukan sistem yang dapat berjalan tanpa internet, laman ini akan dicipta berdasarkan konsep ini!',
      'card.4.title': 'UIUX',
      'card.4.desc': 'Kami sedang mengaji penggunaan dan pengalaman design untuk penguna. Sedarkah anda, laman ini mengandungi parallaxing ?!',
      'card.5.title': 'React dan Javascript',
      'card.5.desc': 'Laman ini telah mengalami 4 interasi, kini kami mengkodkan dengan penggunaan ReactJS.' +
          ' Pernah kami kod dengan AngularJS, AngularJS2 dan JS asal; tetapi kami sekarang gemar dengan ReactJS.' +
          ' CSS laman ini dibina dengan konsep CSS modules.',
      'card.6.title': 'React Native',
      'card.6.desc': 'Kod react native memang menyeronokan, kerana kami dapat belajar javascript, Android dan iOS dalam masa yang sama. ' +
          'Dalam kerja harian, Han masih mengkod dalam Native Android and iOS.' +
          'Kami menasihatkan kepada sesiapa yang mahu mengkod dalam React Native/Nativescript; anda perlu belajar native language iOS/Android untuk mengalami pontensinya.',
      'card.7.title': 'Scala, C# and Java',
      'card.7.desc': 'Pengalaman Han dan Gladys adalah berbeza. Han gemar open source, padahal Gladys gemar akan teknologi Microsoft.',
      'card.8.title': 'Deutsch dari Malaysia',
      'card.8.desc': 'Wir lernen gemainsam am Wochenende Deutsch. Wir lieben Deutsch.',
      'card.9.title': 'Jurnal Gladys\'s',
      'card.9.desc': 'Blog gladys, malangnya kebanyakan di kalangan kami lebih gemar menggunakan facebook daripada blog.'
    }
  };

  public getData():LocaleFormat {
    return this.lang;
  }
}

export class PorfolioLocale extends AbstractLocale {
  private lang:LocaleFormat = {
    en: {
      'title': 'Our Portfolio',
      'subtitle': 'Making Footsteps',
      'desc': 'We\'re still in progress in making a name here, nevertheless, the aim is still to learn and make this site fabulous under Walcron Cooperation.' +
        ' Written below are both Yoong Han and Lee Wan\'s portfolio.',
      'btnlabel': 'Download',
      'dvd.workspace': 'WORKSPACE',
      'dvd.leisure': 'LEISURE / EXPLORE',
      'java.desc': 'An experienced Java developer for more than 10 years, knowledgeable in both J2EE frameworks and POJO. A certified Java developer.',
      'csharp.desc': 'An experienced C# developer for the past 3 years on-hands experience, knowledgeable on MVC 4. Microsoft Certified Professional.',
      'mobile.title': 'WML, Android and iOS developer',
      'mobile.desc': 'An experience mobile developer and even used React Native for development. Certified in both Android and iOS(Swift 4).',
      'web.title': 'Web Development',
      'web.desc': 'On job experience on frontend web development. Focus is given on VanillaJS, AngularJS, ReactJS and SASS.',
      'middleware.title': 'Middleware/SOA',
      'middleware.desc': 'Experience on Tibco, Seagate, Oracle\'s SOA. Migrated, train and being trained on SOA development.',
      'react.title': 'React and React Native Development',
      'react.desc': 'Develop react and react native(for mobile).',
      'functional.title': 'Functional Programming',
      'functional.desc': 'Had fun with Scala/Playframework/Akka/LinQ. Developed a booking system using Play framework.',
      'batch.title': 'Batch Jobs',
      'batch.desc': 'Simple shell scripts on Windows and Linux alike; written and implemented for real companies.',
      'imagery.title': 'Imagery',
      'imagery.desc': 'Interest with photography and art development. Knowledge on Blender and Gimp software basic usages.'
    },
    my: {
      'title': 'Portfolio Kami',
      'subtitle': 'Percubaan',
      'desc': 'Kami masih dalam proses membuat nama dan dikenali, akan tetapi ia tetap penting untuk belajar dan membuat laman ini terkenal dengan nama Walcron Cooperation.' +
        ' Bahan di bawah adalah portfolio Yoong Han dan Lee Wan.',
      'btnlabel': 'Muat Turun',
      'dvd.workspace': 'WORKSPACE',
      'dvd.leisure': 'MINAT / MASA LAPANG',
      'java.desc': 'Berpengalaman dengan Java lebih daripada 10 tahun. Mempunyai sijil sebagai Java developer.',
      'csharp.desc': 'Berpengalaman dengan C# dalam masa 3 tahun dan mengenali MVC 4. Mempunyai sijil sebagai Microsoft Certified Professional.',
      'mobile.title': 'WML, Android dan iOS developer',
      'mobile.desc': 'Berpengalaman dalam telefon bimbit termasuk penggunaan React Native. Mempunyai sijil Android dan iOS(Swift 4).',
      'web.title': 'Pembinaan Laman Website',
      'web.desc': 'Berpengalaman dalam pembinaan website. Fokus diberikan kepada VanillaJS, AngularJS, ReactJS dan SASS.',
      'middleware.title': 'Middleware/SOA',
      'middleware.desc': 'Berpengalaman dalam Tibco, Seagate, Oracle\'s SOA. Pernah membuat training/menerima training dan membuat migrasi untuk SOA.',
      'react.title': 'Bina React dan React Native',
      'react.desc': 'Bina react dan react native untuk applikasi mobil.',
      'functional.title': 'Functional Programming',
      'functional.desc': 'Minat dengan Scala/Playframework/Akka/LinQ. Bina sistem tempahan dengan Play framework.',
      'batch.title': 'Shell Script',
      'batch.desc': 'Shell scripts yang ringkas di Windows dan Linux. Dikodkan dan dilaksanakan dalam kompeni sebenar.',
      'imagery.title': 'Gambar',
      'imagery.desc': 'Kami berminat dalam photograpi dan ciptaan image. Ketahui penggunaan software Blender dan Gimp.'
    }
  };

  public getData():LocaleFormat {
    return this.lang;
  }
}

export class TechnologyLocale extends AbstractLocale {
	private lang:LocaleFormat = {
		en: {
			'title': 'Development Technology',
			'subtitle': 'Fullstack Development',
			'desc': 'These are the technologies used currently for development for this website. '+
					'We like to try different technology tools, as we believe that every tools created best fits for a desired purpose. :)',
			'node.key': 'Extremely fast, Non-blocking, Efficient',
			'node.desc': 'We needed a fast startup server as the cloud hosting we are using shuts down the application every night. This server serves this purpose, and it is blazing fast as well. NPM is the other key function we relied for development.',
			'react.key': 'Simplicity, Elimination of MVC pattern, Fast',
			'react.desc': 'Similar to AngularJS2, the key features for React is to create modular components in Javascript for reuse. The learning curve for React is steep to grasp, once understood, it is easy.',
			'sass.key': 'Familiarity, Readability',
			'sass.desc': 'Created based on modular CSS. The codes however are tied closely with PostCSS, which are within the planned migration.',
			'typescript.key': 'Type safety check',
			'typescript.desc': 'Compiler checking detects error faster and helps alot in Jvascript development. JSX which needs to be compiled for ReactJS benefited alot on this.',
			'common.key': 'Eases Library Imports',
			'common.desc': 'All Javascript codes are written based on CommonJS standards. We had used this with SystemJS and even written AMD loads before, but now we are moving forward to only CommonJS and Webpack.',
			'reacttoolbox.key': 'Material Design Layouts, Simple',
			'reacttoolbox.desc': 'This is the closest react plugin for material design, the one big thing we really missing shifting away from Angular. Material design is slick.',
			'fontawesome.key': 'Big Library, Awesome!',
			'fontawesome.desc': 'Most of the font icons are based on this with some pointing into Google libraries for Material Design fonts.',
			'webpack.key': 'Vast plugins and Bundle',
			'webpack.desc': 'Was using SystemJS (ES6 polyfiller) on the previous iteration, but webpack bundles file better. Hopefully ES6 import becomes more available to new browsers.',
			'gulp.key': 'Easy, Fast',
			'gulp.desc': 'Still using gulp in parallel with the use of Webpack as there are still functionalities for required compilers, i.e. Pug.',
			'pug.key': 'Easy, Readability',
			'pug.desc': 'We loved Jade which is now renamed as Pug. The usage has been trimmed down to minimal due to JSX usage. Nevertheless, it\'s still fun to write in Pug.',
			'animate.key': 'Lightweight, Easy',
			'animate.desc': 'Gone are the days where CSS animations are slower than Javascript. The best thing with this library is that it is pure CSS without the hassle of javascript plugin.',
			'reactslick.key': 'Stable, Fast, Animated',
			'reactslick.desc': 'An all-ready plugin written in React, that is stable and provides the needed carousel function. Though we\'ve plan to rewrite a custom carousel.'
		},
		my: {
			'title': 'Teknologi Laman',
			'subtitle': 'Fullstack Development',
			'desc': 'Inilah teknologi masakini yang digunakan untuk laman ini. '+
					'Kami gemar mencuba teknologi lain setiap kali kerana kami percayai setiap peralatan teknologi dilakar dengan sebab tertentu. :)',
			'node.key': 'Laju dan Tangkas',
			'node.desc': 'Laman ini dikhidmat dalam \'Cloud\' server dan laman ini ditutup setiap hari. Di atas sebab ini, kami memerlukan sistem yang dapat dihidupkan dalam masa yang singkat.',
			'react.key': 'Ringkas, Tiada MVC(V sahaja), Laju',
			'react.desc': 'Selepas mencuba AngularJS2 dan React Native dalam projek dahulu dan gembira dengan hasilnya, menyebabkan kami membuat keputusan untuk melaksanakan React dalam projek terkini.',
			'sass.key': 'Kebiasaan, Senang di baca',
			'sass.desc': 'Dibina berdasarkan modular CSS. Kod SASS telahpun dicampur aduk dengan PostCSS, satu process migrasi ke PostCSS yang telah dirancangkan.',
			'typescript.key': 'Type/Jenis disemak',
			'typescript.desc': 'Sistem "compile" kod Javascript dan ia menyemak type setiap variable demi mengurangkan kesilapan kod. ReactJS mendapatkan manfaatkan dari pergabungan antara JSX dan Typescript.',
			'common.key': 'Memudahkan Library Import',
			'common.desc': 'Javascript yang dikodkan adalah berdasarkan standard CommonJS. Kami pernah mengunakan SystemJS and AMD, tetapi sekarang kami mengunakan webpack.',
			'reacttoolbox.key': 'Material Design, Ringkas',
			'reacttoolbox.desc': 'Plugin react yang mengunakan rekabentuk Material Design dari Google. Inilah satu library yang kami rindu dalam AngularJS.',
			'fontawesome.key': 'Sumber yang besar, Awesome!',
			'fontawesome.desc': 'Kebanyakan font dan ikon yang digunakan dalam laman ini adalah berdasarkan library ini. Terdapat juga kegunaan font dan ikon dari Google.',
			'webpack.key': 'Banyak library dan berkas',
			'webpack.desc': 'Pernah mengunakan SystemJS (ES6 polyfiller) dalam project lama, tetapi webpack adalah lebih lancar dan cepat. Kami berharap ES6 import dapat digunakan di masa hadapan.',
			'gulp.key': 'Cepat, Mudah',
			'gulp.desc': 'Kami mengunakan Gulp untuk activity pelbagai walaupun kami mengunakan webpack, terdapatnya fungsi yang lain di dalam Gulp yang kita perlukan, seperti Pug.',
			'pug.key': 'Mudah, Senang dibaca',
			'pug.desc': 'Kami sukakan Jade, yang telah dinamakan Pug. Kegunaan Pug adalah sedikit kerana kami mengunakan React/JSX yang cuma memerlukan syntax HTML. Pug masih seronok dikodkan.',
			'animate.key': 'Kecil, Mudah',
			'animate.desc': 'Animasi CSS di pelayar sekarang adalah cepat seperti Javascript. Apa yang baik tentang library ini adalah kemudahan mengimport CSS class untuk animasi tanpa Javascript.',
			'reactslick.key': 'Stabil, Laju, Ada animasi',
			'reactslick.desc': 'Plugin ReactJS yang mudah diintegrasi dengan ReactJS, ianya stabil dan animasinya cantik. Kami ada rancangan untuk menulis semula carousel dalam React.'

		}
	}

	public getData():LocaleFormat {
		return this.lang;
	}
};
