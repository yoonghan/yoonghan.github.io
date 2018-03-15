'use strict'
import { UtilLocale }  from "../../patternlibrary/tsx/util/UtilLocale";

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
    if(!langTranslated[this.getLocale()]) {
      console.warn("Key untranslated for:"+key);
    }
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

interface LocaleFormatv2 {
  [key: string]: LocaleSubFormatv2;
}

interface LocaleSubFormatv2 {
  en: string;
  my: string;
  [key: string]: string;
};

export abstract class AbstractLocalev2 {
  protected abstract getData():LocaleFormatv2;

  public translate(key: string): string {
    const langTranslated = this.getData();
    if(!langTranslated[key]) {
      console.warn("Key untranslated for:"+key);
    }
    return langTranslated[key][this.getLocale()];
  }

  private getLocale():string {
    const lang = UtilLocale.extractLanguageFromPath();
    return lang;
  }
};

export class HeaderLocale extends AbstractLocalev2 {
  private lang:LocaleFormatv2 = {
    'about': {
      en: 'About',
      my: 'Kenal'
    },
    'profile': {
      en: 'Profile',
      my: 'Profile'
    },
    'blog': {
      en: 'Blog',
      my: 'Blog'
    },
    'develop': {
      en: 'Build',
      my: 'Bina'
    },
    'tech': {
      en: 'Tech',
      my: 'Tek'
    },
    'home': {
      en: 'Home',
      my: 'Home'
    },
    'title': {
      en: 'Full-stack Developer For Hire',
      my: 'Full-stack Developer Untuk Disenggara'
    }
  };

  public getData():LocaleFormatv2 {
    return this.lang;
  }
};

export class FooterLocale extends AbstractLocalev2 {
  private lang:LocaleFormatv2 = {
    'about': {
      en: 'About',
      my: 'Kenal'
    },
    'profile': {
      en: 'Portfolio',
      my: 'Portfolio'
    },
    'blog': {
      en: 'Blog',
      my: 'Blog'
    },
    'develop': {
      en: 'Build',
      my: 'Bina'
    },
    'tech': {
      en: 'Tech',
      my: 'Tech'
    },
    'contactus': {
      en: 'Contact Us',
      my: 'Hubungi Kami'
    },
    'contactus.title': {
      en: 'CONTACT US VIA EMAIL',
      my: 'HUBUNGI KAMI MELALUI EMAIL'
    },
    'contactus.msg': {
      en: 'We are glad to respond. You can get in contact with us from the links below.',
      my: 'Kami bangga menjawab anda. Sila hubungi kami melalui rangkaian di bawah.'
    }
  };

  public getData():LocaleFormatv2 {
    return this.lang;
  }
};

export class DevelopLocale extends AbstractLocalev2 {
  private lang:LocaleFormatv2 = {
    'title': {
      en: 'Website Development',
      my: 'Pembinaan Laman'
    },
    'intro': {
      en: 'Introduction',
      my: 'Pengenalan'
    },
    'desc.1': {
      en: 'Walcron website was created as a passion for web technology.',
      my: 'Laman Walcron dicipta kerana cinta, cinta dengan teknologi web.'
    },
    'desc.2': {
      en: 'This website has gone through it\'s 4th iteration with usage of different frameworks or libraries. The UX has gone through various changes as well. Each rewrite of the website is rewritten from scratch up, this prevents dependencies from the previous projects to stack; with an exception on "About Me" page. For every new iteration made, it will inherits good traits and characteristics learnt from the previous iterations.',
      my: 'Laman web ini telah dikitar sebanyak 4 kali dengan penggunaan framework atau library yang berbeza. UX(pengalaman pengguna) juga melalui pelbagai perubahan. Setiap kali, laman ini di tulis semula dari permulaan, demi mengelakkan kebergantungan dari projek terdahulu; dengan pengecualian site "Kenalan". Setiap iterasi baru yang dibuat, terdapatnya sifat-sifat dan ciri-ciri baik yang diwarisi dari iterasi sebelumnya.'
    },
    'title.implementation': {
      en: 'Latest Implementation',
      my: 'Perlaksanaan Terkini'
    },
    'title.history': {
      en: 'Cycle History',
      my: 'Sejarah'
    },
    'implementation.create': {
      en: 'We used ReactJS library to created a maintainable pattern library, a small website to maintain a list of modular web components. This enables us to build, test and verify our small modular web components.',
      my: 'Akan sebab kod dibina menggunakan ReactJs, saya membina Pattern Library untuk memodularkan web komponent. Ini membolehkan pembinaan dan uji menguji component baru mahupun lama.'
    },
    'implementation.develop': {
      en: 'With the list of components within the pattern library, the components are then reused to build the main website; the website for Walcron.',
      my: 'Laman Walcron dibina mengunakan komponent yang dibina di dalam Pattern Library.'
    },
    'implementation.test.build': {
      en: 'We uses Gradle to then tests and compile an optimizes the developed website into a production website ready.',
      my: 'Menggunakan Gradle, alat ini menguji dan mengcompile kod yang optimum bagi digunakan untuk production.'
    },
    'implementation.deploy': {
      en: 'The final compiled version with Gradle is then push into a Cloud service, followed by a CDN cache clearing.',
      my: 'Akhirnya, kod optimum diletakkan ke dalam sistem Cloud, diikuti dengan pemadaman CDN cache.'
    },

    'first': {
      en: 'The First',
      my: 'Permulaan'
    },
    'first.text': {
      en: 'As a start-off, the site was wrote in VanillaJS. The site was ported from Tomcat to Wildfly, JBoss to vert.x web servers. The latter(vert.x) made us realize on the importance on non-block I/O services. This marks for a 2nd iteration.',
      my: 'Sebagai permulaan, laman web ini dikodkan dengan penggunaan vanillaJS. Laman ini telah dialihkan dari Tomcat ke Wildfly, JBoss, kemudiannya ke vert.x pelayan web. Ciptaan akhir menyebabkan kesedaran mengenai kepentingan perkhidmantan tanpa I/O-block, yang menandakan untuk kitaran kedua.'
    },
    'second': {
      en: 'Second Iteration',
      my: 'Iterasi Kedua'
    },
    'second.text': {
      en: 'Again the second site was wrote in vanillaJS, with some alteration. It now ran on NodeJS. We have added parallax UX, but the rendering was slow.',
      my: 'Sekali lagi laman yang kedua ditulis dengan vanillaJS, tetapi beberapa ciri-ciri baru telah ditambah dalamnya. Pertama sekali, ia diintegrasi dengan NodeJS. Kami menambah parallax UX ke atas laman kami, akan tetapi, kelajuan laman ini terjejas.'
    },
    'second.1.title': {
      en: 'Startup',
      my: 'Sistem dihidupkan'
    },
    'second.1.desc': {
      en: 'As the hosting cloud servers restarted every day, NodeJS speed startup at 2-3 seconds, saved our cost.',
      my: 'Laman ini dihostkan di cloud dan ia dimatikan setiap hari. NodeJS dapat dihidupkan dengan kelajuan 2-3 saat, ini menyelamatkan kos kami.'
    },
    'second.2.title': {
      en: 'Styling',
      my: 'Rekabentuk'
    },
    'second.2.desc': {
      en: 'Introducing stylus/SASS to the page.',
      my: 'Memperkenalkan stylus/SASS ke laman ini.'
    },
    'second.3.title': {
      en: 'Interactivity',
      my: 'Interaktiviti'
    },
    'second.3.desc': {
      en: 'With parallaxing, more interactive to user response.',
      my: 'Dengan pengunaan parallaxing, terdapatnya interaktiviti dengan pengguna.'
    },
    'third': {
      en: 'Third Iteration',
      my: 'Iterasi Ketiga'
    },
    'third.text': {
      en: 'Rewrote under NodeJS again, but introduced a pattern library for JS/CSS references. A beta version of AngularJS 2 was used in some of the developed pages.',
      my: 'Menulis semula mengunakan NodeJS, tetapi memperkenalkan \'pattern library\' untuk rujukan CSS dan JS. Versi beta AngularJS 2 telah digunakan dalam beberapa halaman ini.'
    },
    'third.1.title': {
      en: 'Reference',
      my: 'Rujukan'
    },
    'third.1.desc': {
      en: 'Introducing pattern library with small JS modules which makes Javascript debugging easier. However, plugging into the main website becomes a problem.',
      my: 'Menulis satu perpustakaan JS untuk rujukan. Javascript adalah lebih mudah di-debug dalam proses ini. Akan tetapi, plugin ke laman utama adalah satu masalah besar.'
    },
    'third.2.title': {
      en: 'Experimental Technology',
      my: 'Teknologi Experimen'
    },
    'third.2.desc': {
      en: 'Even as beta, Angular 2 concept was good. It made ease to the pattern library plug-in issues.',
      my: 'Pengunaan versi beta Angular 2 dapat menyelesaikan masalah plug-in dalam pattern library.'
    },
    'third.3.title': {
      en: 'Material Design',
      my: 'Material Design'
    },
    'third.3.desc': {
      en: 'Rewriting material design from Google\'s material view into AngularJS 2 was challenging, but achieved it.',
      my: 'Kami mengunakan library Material Design dari Google untuk memaparkan laman kita kepada pengunna. Menggunakan ia dengan AngularJS 2 memang mencabarkan.'
    },
    'third.4.title': {
      en: 'Static Typings',
      my: 'Static Typings'
    },
    'third.4.desc': {
      en: 'Created JS modules are now static typed and sound checked when compiled.',
      my: 'Javascript yang dikodkan sekarang diperiksa mengunakan pengkompile Typescript.'
    },
    'third.5.title': {
      en: 'Library Loading',
      my: 'Library Loading'
    },
    'third.5.desc': {
      en: 'We mixed usage of CommonJS, AMD and ES6 loading modules in this iteration.',
      my: 'Kami mencampurkan pengunaan CommonJS, AMD dan ES6 loading modules dalam iterasi ini.'
    },
    'third.6.title': {
      en: 'Harmony',
      my: 'Harmoni'
    },
    'third.6.desc': {
      en: 'Created themes to create better harmonization.',
      my: 'Mencipta tema supaya menwujudkan keharmonian yang lebih baik kepada penguna.'
    },
    'third.7.title': {
      en: 'Routing',
      my: 'Routing'
    },
    'third.7.desc': {
      en: 'Used the famous Angular routing to create Single Page Access. This badly affects the SEO statistic, which is decidedly to be dropped in the fourth iteration.',
      my: 'Mengguna Angular routing yang terkenal untuk memcipta laman Single Page Access. Ini menjejaskan statistic SEO yang nyata, menyebabkan keperluan iterasi yang ke-4.'
    },
    'fourth': {
      en: 'Fourth Iteration',
      my: 'Iterasi Keempat'
    },
    'fourth.text': {
      en: 'Given the experience with AngularJS2 and React Native in this iteration; we decided to go with ReactJS. The transition and the concept of ReactJS blew us out of the water, wow!',
      my: 'Memandangkan pengalaman dengan AngularJS2 dan React Native pada iterasi ini; kami mengambil keputusan untuk menggunakan ReactJS. Peralihan dan konsep ReactJS mengejutkan kami. Hidup React!'
    },
    'fourth.1.title': {
      en: 'Reference',
      my: 'Rujukan'
    },
    'fourth.1.desc': {
      en: 'Pattern Libraries\'s Plug and play using ReactJS and module creation concept into the main project is now easy and robust.',
      my: 'Pattern Library Plug and Play menggunakan ReactJS dan konsep penciptaan modul ke dalam projek utama kini mudah dan mantap.'
    },
    'fourth.2.title': {
      en: 'Latest Technology',
      my: 'Teknologi terbaru'
    },
    'fourth.2.desc': {
      en: 'Pushing boundaries to use even PostCSS!',
      my: 'Mengunakan teknologi baru, termasuk pug and POSTCSS.'
    },
    'fourth.3.title': {
      en: 'Heaven of Plugins',
      my: 'Plugin yang banyak'
    },
    'fourth.3.desc': {
      en: 'React Libraries are vast and easy to grasp.',
      my: 'React Library yang banyak dan mudah digunakan.'
    },
    'fourth.4.title': {
      en: 'Faster Library Loading',
      my: 'Library Loading yang cepat'
    },
    'fourth.4.desc': {
      en: 'Improved loading even more with webpack bundling.',
      my: 'Pengunaan webpack mencepatkan masa muat turun.'
    },
    'fourth.5.title': {
      en: 'Modular',
      my: 'Modular'
    },
    'fourth.5.desc': {
      en: 'Everything was broken into small modules in patternlibrary, including CSS, making it extremely managable.',
      my: 'Semua benda untuk laman ini dibuat dalam komponent kecil termasuk CSS.'
    }
  };

  public getData():LocaleFormatv2 {
    return this.lang;
  }
}

export class IndexLocale extends AbstractLocalev2 {
  private lang:LocaleFormatv2 = {
    'title.research': {
      en: 'JOURNEY',
      my: 'PENCAPAIAN'
    },
    'title.development': {
      en: 'DEVELOPMENT',
      my: 'BINAAN LAMAN'
    },
    'title.leisure': {
      en: 'LEISURE',
      my: 'MASA LAPANG'
    },
    'header.text': {
      en: "A Simple Start Up Site",
      my: "Laman Rangkaian Ringkas"
    },
    'header.concepttext': {
      en: "\"Inspired by the Ikigai concept\"",
      my: "\"Inspirasi berdasarkan konsep Ikigai\""
    },
    'header.description': {
      en: "is a dedicated website created by Han & Lee Wan to represent our life as a programmer.",
      my: "adalah laman yang dicipta oleh Han & Lee Wan yang melambangkan hidup kami sebagai programmer."
    },
    'header.button': {
      en: "GET TO KNOW US",
      my: "KENALI KAMI"
    },
    'label.download': {
      en: 'Download',
      my: 'Muat Turun'
    },
    'label.blog': {
      en: 'Bragging Blog',
      my: 'Bragging Blog'
    },
    'label.read': {
      en: 'Read More',
      my: 'Ketahui Lebih'
    },
    'vote.result': {
      en: 'Vote Result',
      my: 'Keputusan Undian'
    },
    'post.1.title': {
      en: 'Who we are',
      my: 'Kami siapa'
    },
    'post.1.text': {
      en: 'We are keen to learn any internet/communication technologies. This site is created with this in mind.',
      my: 'Kami peneroka dalam teknologi perhubungan. Laman ini dibina berdasarkan concept ini.'
    },
    'post.2.title': {
      en: 'Motive',
      my: 'Motif'
    },
    'post.2.text': {
      en: 'We are exploring key to <strong>a good full-stack developer</strong>. Covering both frontend and backend.',
      my: 'Kami mahu mengkaji keupayaan yang penting sebagai programmer - <strong>full-stack developer yang baik.</strong>'
    },
    'post.3.title': {
      en: 'A no cookies website',
      my: 'Laman tanpa cookie'
    },
    'post.3.text': {
      en: 'This site does not track you. Seriously, enjoy your exploration here.',
      my: 'Laman in tidak menjejaki anda.'
    },
    'card.11.title': {
      en: 'Presentation on Bitcoin',
      my: 'Presentasi tentang Bitcoin'
    },
    'card.11.desc': {
      en: 'To achieve his personal goal(to present every year), Han have decided to host a presentation on Bitcoin and Blockchain, 24 people attended and the reaction was great!',
      my: 'Untuk mencapai "Personal" goal sendiri; Han memutuskan untuk mengadakan ceramah bertajuk Bitcoin dan Blockchain. Seramai 24 orang hadir and hasilnya amat dialu-alukan.'
    },
    'card.10.title': {
      en: 'Won Hackathon in IOT and Cloud',
      my: 'Menangi Hackathon tentang IOT dan Cloud'
    },
    'card.10.desc': {
      en: 'Won an Echodot in this year\'s competition. The team consists of 5 person, we came up with the idea related to autonomous car reaction for heart-attack drivers.',
      my: 'Han dengan 4 rakan sekerjanya memenangi sebiji Echodot/setiap orang untuk Hackathon 2017. Idea kami adalah bekenaan dengan "Automonous Car", di mana kereta akan secara automatik berbalas apabila pesakit jantung mengalami kecemasan.'
    },
    'card.0.title': {
      en: 'Design Thinking Workshop',
      my: 'Design Thinking Workshop'
    },
    'card.0.desc': {
      en: 'Han attended Design Thinking workshop/Garage which was organized by the company in Beijing, China. The concept of this workshop is to present an end customer solution by working together with various experts on different fields. The end result was fabulous as we manage to create a Proof-Of-Concept game in just 5 days time using Unity software.',
      my: 'Han menghadiri Design Thinking workshop yang dianjurkan di Beijing, China. Konsep bengkel in adalah untuk membentangkan penyelesaian pelanggan dengan bekerjasama dengan pelbagai pakar dalam bidang yang berbeza. Hasilnya adalah hebat kerana kami berjaya mencipta Game Proof-Of-Concept menggunakan Unity hanya dalam masa 5 hari.'
    },
    'card.1.title': {
      en: 'Hackathon with Deep Learning',
      my: 'Hackathon dengan Deep Learning'
    },
    'card.1.desc': {
      en: 'Won a hackathon, the 5 person team created an image scanning to identify a vehicle model using a mobile. We will be dedicating the year 2017 into deep learning research using Scala programming language.',
      my: 'Memenangi hackathon; kumpulan 5 orang mencipta sistem yang mengenali model kenderaan berdasarkan gambar yang diambil. Kami akan fokus dalam teknologi deep learning dalam tahun 2017 ini.'
    },
    'card.2.title': {
      en: 'Parallel Processings',
      my: 'Proses dalam masa yang sama'
    },
    'card.2.desc': {
      en: 'Han had been focusing threading, but have not get a good grip on it yet. He had been programming in Scala, RxJS, Akka.'
            + ' Our ultimate goal now is having Apache Sparks with Deep Learning, working.',
      my: 'Fokus Han adalah membina proses dengan multi-threading. Kod dia difokus mengunakan Scala, RxJS, Akka.'
            + ' Matlamat utama kami sekarang adalah membolehkan Apache Sparks berjalan dengan Deep Learning.'
    },
    'card.21.title': {
      en: 'Domain rename',
      my: 'Domain tukar nama'
    },
    'card.21.desc': {
      en: 'Renamed to Walcron from the name jomjaring. Resetup networks, CDN, domain.',
      my: 'Menamakan laman ini sebagai Walcron, tidak lagi sebagai Jomjaring.'
    },
    'card.22.title': {
      en: 'ReactJS',
      my: 'ReactJS'
    },
    'card.22.desc': {
      en: 'Migration to use React JS.',
      my: 'Migrasi ke React JS.'
    },
    'card.3.title': {
      en: 'Progressive App',
      my: 'Aplikasi Progressive'
    },
    'card.3.desc': {
      en: 'To find ways to load page in a smooth availability manner. It\'s important for this page to be available online.',
      my: 'Kami memerlukan laman web ini dimuat ke dalam browser secara lancar. Pertimbangan ini hendaklah memenuhi kertersediaan laman ini tanpa internet.'
    },
    'card.31.title': {
      en: 'AngularJS 2',
      my: 'AngularJS 2'
    },
    'card.31.desc': {
      en: 'Migration to use AngularJS 2.',
      my: 'Migrasi ke AngularJS 2.'
    },
    'card.4.title': {
      en: 'UIUX',
      my: 'UIUX'
    },
    'card.4.desc': {
      en: 'Studying on user interface and user experience. This site will have modification over time, based on the book "Don\'t Make Me Think". Have you notice that this page is parallaxed ?!',
      my: 'Kami sedang mengaji penggunaan dan pengalaman design untuk penguna. Laman ini akan diubah dari masa-ke-semasa mengikuti buku "Don\'t Make Me Think". Sedarkah anda, laman ini mengandungi parallaxing ?!'
    },
    'card.43.title': {
      en: 'Angular JS',
      my: 'Angular JS'
    },
    'card.43.desc': {
      en: 'Migration to Angular JS with Material Design.',
      my: 'Migrasi ke Angular JS dengan Material Design'
    },
    'card.41.title': {
      en: '2015 Scheduler',
      my: '2015 Scheduler'
    },
    'card.41.desc': {
      en: 'Developed a website that uses Websocket technology and it actually have an accurate 100% updating progress bar using threads and mongoDB check.',
      my: 'Bina laman yang menggunakan teknologi Websocket dan ia mengandungi progress bar yang boleh mengira sampai 100%.'
    },
    'card.42.title': {
      en: '2014 Start',
      my: '2014 Mula'
    },
    'card.42.desc': {
      en: 'Started this website as Jom Jaring.',
      my: 'Bina laman ini dan namakan ia Jom Jaring.'
    },
    'card.5.title': {
      en: 'Javascript with ReactJS',
      my: 'Javascript with ReactJS'
    },
    'card.5.desc': {
      en: 'This website has went through 4 interations, and we are now using the ReactJS technology.' +
          ' Previously, we had been writing this in AngularJS, AngularJS2 and pure JS; but today, we\'re prefering ReactJS.' +
          ' This site\'s CSS is build based on CSS modules.',
      my: 'Laman ini telah mengalami 4 interasi, kini kami mengkodkan dengan penggunaan ReactJS.' +
          ' Pernah kami kod dengan AngularJS, AngularJS2 dan JS asal; tetapi kami sekarang gemar dengan ReactJS.' +
          ' CSS laman ini dibina dengan konsep CSS modules.'
    },
    'card.6.title': {
      en: 'Mobile with React Native',
      my: 'Mobile with React Native'
    },
    'card.6.desc': {
      en: 'Coding react native was an extremely wonderful experience as we learnt Android, iOS and Javascripts at the same time. ' +
          'The only problem we had is to override the main backdrop color. On our job basis, Han still writing native Android and iOS codes.' +
          'An advice to anyone writing React Native/Nativescript: it is very important to learn native language to harness it\'s true potential.',
      my: 'Kod react native memang menyeronokan, kerana kami dapat belajar javascript, Android dan iOS dalam masa yang sama. ' +
          'Dalam kerja harian, Han masih mengkod dalam Native Android and iOS.' +
          'Kami menasihatkan kepada sesiapa yang mahu mengkod dalam React Native/Nativescript; anda perlu belajar native language iOS/Android untuk mengalami pontensinya.'
    },
    'card.7.title': {
      en: 'Scala, C# and Java',
      my: 'Scala, C# and Java'
    },
    'card.7.desc': {
      en: 'Han and Gladys have different programming preferences. Han likes opensource while Gladys likes Microsoft products.',
      my: 'Pengalaman Han dan Gladys adalah berbeza. Han gemar open source, padahal Gladys gemar akan teknologi Microsoft.'
    },
    'card.8.title': {
      en: 'Deutsch from Malaysia',
      my: 'Deutsch dari Malaysia'
    },
    'card.8.desc': {
      en: 'Wir haben an den Wochenenden drei Jahre Deutsch gelernt, aber unsere Deutch ist immer noch nicht gut. Wir konnen ein bisseren Deutsch sprechen und schreiben.',
      my: 'Wir haben an den Wochenenden drei Jahre Deutsch gelernt, aber unsere Deutch ist immer noch nicht gut. Wir konnen ein bisseren Deutsch sprechen und schreiben.'
    },
    'card.9.title': {
      en: 'Transformers Journal',
      my: 'Jurnal Transformers'
    },
    'card.9.desc': {
      en: 'A journal about Transformers collected, it\'s unfortunately not being updated as there\'s no followers on this.' +
          ' I guess nobody actually goes much to bloggin nowadays, ever since the born of facebook. This was suppose to be Gladys\'s profile.',
      my: 'Blog tentang Transformers. Ianya sepatutnya Blog tentang Gladys, akan tetapi kesukaran untuk memaparkan laman website percuma, akhirnya website ini ditukar.'
    }
  };

  public getData():LocaleFormatv2 {
    return this.lang;
  }
}

export class PorfolioLocale extends AbstractLocalev2 {
  private lang:LocaleFormatv2 = {
    'title': {
      en: 'Our Portfolio',
      my: 'Portfolio Kami'
    },
    'subtitle': {
      en: 'Making Footsteps',
      my: 'Percubaan'
    },
    'desc': {
      en: 'We\'re still in progress in making a name here, nevertheless, the aim is to learn continously and make this site fabulous under the Walcron Cooperation roof.' +
        ' Written below are both Yoong Han and Lee Wan\'s portfolio.',
      my: 'Kami masih dalam perjejahan menbina status, akan tetapi ia tetap penting untuk terus belajar dan membuat laman ini terkenal dengan nama Walcron Cooperation.' +
        ' Bahan di bawah adalah portfolio Yoong Han dan Lee Wan.'
    },
    'btnlabel': {
      en: 'Download',
      my: 'Muat Turun'
    },
    'dvd.workspace': {
      en: 'WORK EXPERIENCE',
      my: 'PENGALAMAN'
    },
    'dvd.leisure': {
      en: 'LEISURE / EXPLORE',
      my: 'MINAT / MASA LAPANG'
    },
    'java.desc': {
      en: 'An experienced Java developer for more than 10 years, knowledgeable in both J2EE frameworks and POJO. A certified Java developer.',
      my: 'Berpengalaman dengan Java lebih daripada 10 tahun. Mempunyai sijil sebagai Java developer.'
    },
    'csharp.desc': {
      en: 'An experienced C# developer for the past 3 years on-hands experience, knowledgeable on MVC 4. Microsoft Certified Professional.',
      my: 'Berpengalaman dengan C# lebin dari 3 tahun dan mengenali MVC 4. Mempunyai sijil sebagai Microsoft Certified Professional.'
    },
    'mobile.title': {
      en: 'WML, Android and iOS developer',
      my: 'WML, Android dan iOS developer'
    },
    'mobile.desc': {
      en: 'An experience mobile developer and even used React Native for development. Certified in both Android and iOS(Swift 4).',
      my: 'Berpengalaman dalam menprogramkan smartphone termasuk penggunaan React Native. Mempunyai sijil Android dan iOS(Swift 4).'
    },
    'web.title': {
      en: 'Web Development',
      my: 'Pembinaan Laman Website'
    },
    'web.desc': {
      en: 'On job experience on frontend web development. Focus is given on VanillaJS, AngularJS, ReactJS and SASS.',
      my: 'Berpengalaman dalam pembinaan website. Fokus diberikan kepada VanillaJS, AngularJS, ReactJS dan SASS.'
    },
    'middleware.title': {
      en: 'Middleware/SOA',
      my: 'Middleware/SOA'
    },
    'middleware.desc': {
      en: 'Experience on Tibco, Seagate, Oracle\'s SOA. Migrated, train and being trained on SOA development.',
      my: 'Berpengalaman dalam Tibco, Seagate, Oracle\'s SOA. Pernah membuat training/menerima training dan membuat migrasi untuk SOA.'
    },
    'react.title': {
      en: 'React and React Native Development',
      my: 'Bina React dan React Native'
    },
    'react.desc': {
      en: 'Develop react and react native(for mobile). Real application includes "Ez-Postcard" and "Han & Leewan" hosted in Google Playstore.',
      my: 'Bina react dan react native untuk applikasi mobil. Applikasi termasuk "Ez-Postcard" dan "Han & Lee Wan" di Google Playstore.'
    },
    'functional.title': {
      en: 'Functional Programming',
      my: 'Functional Programming'
    },
    'functional.desc': {
      en: 'Had fun with Scala/Playframework/Akka/LinQ. Developed a booking system using Play framework.',
      my: 'Minat dengan Scala/Playframework/Akka/LinQ. Bina sistem tempahan dengan Play framework.'
    },
    'batch.title': {
      en: 'Batch Jobs',
      my: 'Shell Script'
    },
    'batch.desc': {
      en: 'Simple shell scripts on Windows and Linux alike; written and implemented for real companies.',
      my: 'Shell scripts yang ringkas di Windows dan Linux. Dikodkan dan dilaksanakan dalam kompeni sebenar.'
    },
    'imagery.title': {
      en: 'Imagery',
      my: 'Gambar'
    },
    'imagery.desc': {
      en: 'Interest with photography and art development. Knowledge on Blender and Gimp software basic usages.',
      my: 'Kami berminat dalam photograpi dan ciptaan image. Ketahui penggunaan software Blender dan Gimp.'
    }
  };

  public getData():LocaleFormatv2 {
    return this.lang;
  }
}

export class ProgressiveLocale extends AbstractLocalev2 {
  private lang:LocaleFormatv2 = {
    'title': {
      en: 'Progressive Web',
      my: 'Laman Web Berperingkat'
    },
    'intro': {
      en: 'Website Loaded In Stages',
      my: 'Laman Diloadkan Secara Peringkat'
    },
    'desc.1': {
      en: 'Progressive web let the page loads in every browser and feels app-like.',
      my: 'Progressive web membolehkan laman diloadkan seandaikan anda menggunakan app.'
    },
    'desc.2': {
      en: 'A technology was introduced, called as Service Workers, limited to certain browsers, it allows the user to load a webpage in offline mode.',
      my: 'Satu teknologi telah diperkenalkan, iaitu Service Workers. Ia membolehkan pengguna mengunakan laman website tanpa internet.'
    },
    'offline.stickytitle': {
      en: 'Offline Loading',
      my: 'Load Tanpa Internet'
    },
    'offline.title.step1': {
      en: 'Step 1',
      my: 'Langkah 1'
    },
    'offline.desc.step1': {
      en: 'Ensure that you are using a browser that supports service workers. Chrome, Firefox and Safari browser are one of those supported browsers.',
      my: 'Perhatikan bahawa anda menggunakan pelayar yang menyokong service worker. Chrome, Firefox dan Safari adalah pelayar yang mempunyai fungsi ini.'
    },
    'offline.title.step2': {
      en: 'Step 2',
      my: 'Langkah 2'
    },
    'offline.desc.step2': {
      en: 'Click on the "Install" button below, if your browser support service workers, the button "INSTALL NOW" will be shown.',
      my: 'Klik butang "Install" di bawah, jikalau pelayar anda menyokong Service Worker butang "INSTALL SEKARANG" akan dipaparkan.'
    },
    'offline.title.step3': {
      en: 'Step 3',
      my: 'Langkah 3'
    },
    'offline.desc.step3': {
      en: 'Now you are ready to go offline and have this site running. <strong>Bookmark this page.</strong>',
      my: 'Sekarang anda boleh melayar website ini tanpa internet. <strong>Bookmark laman ini.</strong>'
    },
    'ready': {
      en: 'Install Now',
      my: 'Install Sekarang'
    },
    'notsupported': {
      en: 'Browser Not Supported',
      my: 'Pelayar Tidak Disokong'
    },
    'installing': {
      en: 'Installing. Please wait for about 5 minutes.',
      my: 'Processing. Sila tunggu, anggar 5 minit.'
    },
    'installed': {
      en: 'Installed And Ready',
      my: 'Installed Dan Ok'
    },
    'alreadyInstalled': {
      en: 'Already Installed',
      my: 'Telah Tersedia'
    },
    'updating': {
      en: 'Updating',
      my: 'Pengemaskinian'
    },
    'failed': {
      en: 'Failed / Retry',
      my: 'Gagal / Cuba Lagi'
    }
  };

  public getData():LocaleFormatv2 {
    return this.lang;
  }
}

export class TechnologyLocale extends AbstractLocalev2 {
	private lang:LocaleFormatv2 = {
    'title' : {
      en: 'Development Technology',
      my: 'Teknologi Laman Web Ini'
    },
    'subtitle' : {
      en: 'Fullstack Development',
      my: 'Fullstack Development'
    },
    'desc' : {
      en: 'These are the technologies used currently for development for this website. '+
					'We like to try different technology tools, as we believe that every tools created best fits for a desired purpose. :)',
      my: 'Inilah teknologi masakini yang digunakan untuk laman ini. '+
					'Kami gemar mencuba teknologi lain setiap kali kerana kami percayai setiap peralatan teknologi dilakar dengan sebab tertentu. :)'
    },
    'node.key' : {
      en: 'Extremely fast, Non-blocking, Efficient',
      my: 'Laju dan Tangkas'
    },
    'node.desc' : {
      en: 'We needed a fast startup server as the cloud hosting we are using shuts down the application every night. This server serves this purpose, and it is blazing fast as well. NPM is the other key function we relied for development.',
      my: 'Laman ini dikhidmat dalam \'Cloud\' server dan laman ini ditutup setiap hari. Di atas sebab ini, kami memerlukan sistem yang dapat dihidupkan dalam masa yang singkat.'
    },
    'react.key' : {
      en: 'Simplicity, Elimination of MVC pattern, Fast',
      my: 'Ringkas, Tiada MVC(V sahaja), Laju'
    },
    'react.desc' : {
      en: 'Similar to AngularJS2, the key features for React is to create modular components in Javascript for reuse. The learning curve for React is steep to grasp, once understood, it is easy.',
      my: 'Selepas mencuba AngularJS2 dan React Native dalam projek dahulu dan gembira dengan hasilnya, menyebabkan kami membuat keputusan untuk melaksanakan React dalam projek terkini.'
    },
    'sass.key' : {
      en: 'Familiarity, Readability',
      my: 'Kebiasaan, Senang di baca'
    },
    'sass.desc' : {
      en: 'Created based on modular CSS. The codes however are tied closely with PostCSS, which are within the planned migration.',
      my: 'Dibina berdasarkan modular CSS. Kod SASS telahpun dicampur aduk dengan PostCSS, satu process migrasi ke PostCSS yang telah dirancangkan.'
    },
    'typescript.key' : {
      en: 'Type safety check',
      my: 'Type/Jenis disemak'
    },
    'typescript.desc' : {
      en: 'Compiler checking detects error faster and helps alot in Jvascript development. JSX which needs to be compiled for ReactJS benefited alot on this.',
      my: 'Sistem "compile" kod Javascript dan ia menyemak type setiap variable demi mengurangkan kesilapan kod. ReactJS mendapatkan manfaatkan dari pergabungan antara JSX dan Typescript.'
    },
    'common.key' : {
      en: 'Eases Library Imports',
      my: 'Memudahkan Library Import'
    },
    'common.desc' : {
      en: 'All Javascript codes are written based on CommonJS standards. We had used this with SystemJS and even written AMD loads before, but now we are moving forward to only CommonJS and Webpack.',
      my: 'Javascript yang dikodkan adalah berdasarkan standard CommonJS. Kami pernah mengunakan SystemJS and AMD, tetapi sekarang kami mengunakan webpack.'
    },
    'reacttoolbox.key' : {
      en: 'Material Design Layouts, Simple',
      my: 'Material Design, Ringkas'
    },
    'reacttoolbox.desc' : {
      en: 'This is the closest react plugin for material design, the one big thing we really missing shifting away from Angular. Material design is slick.',
      my: 'Plugin react yang mengunakan rekabentuk Material Design dari Google. Inilah satu library yang kami rindu dalam AngularJS.'
    },
    'fontawesome.key' : {
      en: 'Big Library, Awesome!',
      my: 'Sumber yang besar, Awesome!'
    },
    'fontawesome.desc' : {
      en: 'Most of the font icons are based on this with some pointing into Google libraries for Material Design fonts.',
      my: 'Kebanyakan font dan ikon yang digunakan dalam laman ini adalah berdasarkan library ini. Terdapat juga kegunaan font dan ikon dari Google.'
    },
    'webpack.key' : {
      en: 'Vast plugins and Bundle',
      my: 'Banyak library dan berkas'
    },
    'webpack.desc' : {
      en: 'Was using SystemJS (ES6 polyfiller) on the previous iteration, but webpack bundles file better. Hopefully ES6 import becomes more available to new browsers.',
      my: 'Pernah mengunakan SystemJS (ES6 polyfiller) dalam project lama, tetapi webpack adalah lebih lancar dan cepat. Kami berharap ES6 import dapat digunakan di masa hadapan.'
    },
    'gulp.key' : {
      en: 'Easy, Fast',
      my:  'Cepat, Mudah'
    },
    'gulp.desc' : {
      en: 'Still using gulp in parallel with the use of Webpack as there are still functionalities for required compilers, i.e. Pug.',
      my:  'Kami mengunakan Gulp untuk activity pelbagai walaupun kami mengunakan webpack, terdapatnya fungsi yang lain di dalam Gulp yang kita perlukan, seperti Pug.'
    },
    'pug.key' : {
      en: 'Easy, Readability',
      my: 'Mudah, Senang dibaca'
    },
    'pug.desc' : {
      en: 'We loved Jade that has now been renamed as Pug. The usage has been trimmed down to minimal due to JSX usage. Nevertheless, it\'s still fun to write in Pug.',
      my: 'Kami sukakan Jade, yang telah dinamakan Pug. Kegunaan Pug adalah sedikit kerana kami mengunakan React/JSX yang cuma memerlukan syntax HTML. Pug masih seronok dikodkan.'
    },
    'animate.key' : {
      en: 'Lightweight, Easy',
      my: 'Kecil, Mudah'
    },
    'animate.desc' : {
      en: 'Gone are the days where CSS animations are slower than Javascript. The best thing with this library is that it is pure CSS without the hassle of javascript plugin.',
      my: 'Animasi CSS di pelayar sekarang adalah cepat seperti Javascript. Apa yang baik tentang library ini adalah kemudahan mengimport CSS class untuk animasi tanpa Javascript.'
    },
    'reactslick.key' : {
      en: 'Stable, Fast, Animated',
      my: 'Stabil, Laju, Ada animasi'
    },
    'reactslick.desc' : {
      en: 'An all-ready plugin written in React, that is stable and provides the needed carousel function. Though we\'ve plan to rewrite a custom carousel.',
      my: 'Plugin ReactJS yang mudah diintegrasi dengan ReactJS, ianya stabil dan animasinya cantik. Kami ada rancangan untuk menulis semula carousel dalam React.'
    },
    'precache.key' : {
      en: 'Offline mode',
      my: 'Offline mode'
    },
    'precache.desc' : {
      en: 'All this webpage content can now be downloaded into your PC and made it available when you do not have internet!',
      my: 'Membolehkan website ini berfungsi di pelayar komputer mahupun smartphone anda tanpa kemudahan internet!'
    },
    'jest.key' : {
      en: 'Testing Toolkit',
      my: 'Testing'
    },
    'jest.desc' : {
      en: 'Integrated with a Gradle compiler for testing to ensure website is delivered bug free.',
      my: 'Kami menggunakan Jest yang di integrasi dengan Gradle untuk menguji laman.'
    }
	}

	public getData():LocaleFormatv2 {
		return this.lang;
	}
};
