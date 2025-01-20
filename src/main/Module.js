import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SlideTemplate from './SlideTemplate';
import SlideContent from './SlideContent';
import { convertTextToSpeech, stopAudio, speakLocal } from './ListnrTTS'; // Ensure correct import

const slidesData = {
    1: {
        title: "Instructional",
        subtopics: {
            1: {
                title: "Teksto 1: Pinsala ng Bagyong Kristine sa Batangas",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_1', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Sa araw na ito, magsimula tayo sa isang mahalagang paksa tungkol sa epekto ng mga kalamidad sa komunidad. Tignan ninyo ang mga larawan sa ibaba, ito ay mga lugar sa Batangas na nasalanta ng bagyong Kristine. Pansinin ang mga epekto ng bagyo sa mga tao at sa kanilang pamumuhay.",
                            "Ano ang nararamdaman ninyo habang tinitingnan ang mga ito?"
                        ],
                        images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/methode_times_prod_web_bin_9b070b55-b618-40ff-a9b0-39a5567c0763.jpg"]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ninyo nang mabuti ang teksto na pinamagatang “Pinsala ng Bagyong Kristine sa Batangas.”",
                            "Malalaman ninyo dito ang mga naganap noong manalasa ang bagyong Kristine at kung paano nito naapektuhan ang probinsiya ng Batangas.",
                            "Pagkatapos ninyo itong basahin, sagutin ang mga sumusunod na tanong:"
                        ],
                        questions: ["Ano ang epekto ng bagyo sa Batangas?", "Paano nakatulong ang pagdeklara ng state of calamity sa mga apektado?"]
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Pinsala ng Bagyong Kristine sa Batangas",
                        content: [
                            "Sa Isabela sa Hilagang Luzon nag-landfall ang bagyong Kristine noong ika-dalawampu't apat ng Oktubre 2024. Bunsod nito ang pagbaha sa mga probinsiya sa Rehiyon 2 at biglaang pagbaha at malawakang pagguho ng lupa sa Rehiyon IV-A o CALABARZON.",
                            "Isa ang Batangas sa mga probinsiya sa CALABARZON na may naitalang animnapu’t isang  bilang ng mga nasawi, kung saan dalawampu sa mga ito ay mula sa bayan ng Talisay. Karamihan sa mga namatay ay dulot ng pagkalunod sa baha at pagguho ng lupa. Marami ang nasalanta ng bagyong ito at bilang aksyon sa pinsalang dulot ng kalamidad sa buong probinsiya, isinailalim ang Batangas sa state of calamity, na nagbigay daan sa pamahalaan na magbigay ng agarang tulong sa mga apektadong residente at komunidad.",
                            "Kaugnay ng pangyayaring ito, nag-isyu ang Pangulong Marcos ng Proklamasyon Bilang 728, na nagdedeklara ng Nobyembre 4 bilang Day of National Mourning bilang pakikiisa sa mga pamilyang nagluluksa at mga buhay na nasawi dulot ng Bagyong Kristine."
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong ",
                        content: [
                            "Pagkatapos ninyong mabasa ang teksto, isulat sa isang papel ang mga tanong na pumasok sa inyong isip habang binabasa ang teksto at ibahagi ito sa klase.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Pagkatapos masagot ng guro ang mga katanungan ng mga mag-aaral, hahatiin ang klase sa maliliit na pangkat.",
                            "Pag-usapan ninyo sa pangkat ang tanong na ito:",
                            "Gamitin ninyo ang mga impormasyon mula sa teksto at mga ideyang nakalap mula sa inyong mga kapangkat. Pagkatapos, ibahagi sa klase ang inyong mga napag-usapan. Magtulungan at pakinggan ninyo ang opinyon ng isa’t isa."
                        ],
                        questions: [
                            "Ano ang epekto ng bagyo sa komunidad?",
                        ],
                        images: [
                            "https://ehub81.wordpress.com/wp-content/uploads/2025/01/meeting.png"
                        ]
    
                    },
    
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ngayon naman, basahin ninyo ang isang bahagi ng teksto. Pagkatapos, ipakikita ko ang tamang paraan ng pagbasa at ituturo kung paano gamitin ang mga key words sa paghahanap ng sagot.",
                            "Bahagi ng Teksto na Babasahin:",
                            "Isa ang Batangas sa mga probinsiya sa CALABARZON na may naitalang animnaput isang bilang ng mga nasawi, kung saan dalawampu sa mga ito ay mula sa bayan ng Talisay. Karamihan sa mga namatay ay dulot ng pagkalunod sa baha at pagguho ng lupa.",
                            "Tanong: Ano ang epekto ng bagyo sa Batangas?",
                            "Pagkilala sa mga Key Words:",
                            "Ang mahalagang bahagi sa tanong ay “epekto ng bagyo sa Batangas.” Hanapin sa teksto ang mga bahagi na naglalarawan ng mga resulta o epekto sa lugar.",
                            "Pag-highlight ng Detalye: ",
                            "Ang mga salitang “nasawi”, “pagkalunod”, at “pagguho ng lupa” ay naglalarawan ng epekto.",
                            "Pagbuo ng Sagot:",
                            "Batay sa key words, ang sagot ay: Ang epekto ng bagyo sa Batangas ay ang pagkakaroon ng animnaput isang bilang ng nasawi, karamihan ay dahil sa pagkalunod at pagguho ng lupa.",
                        ],
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Ngayon, isulat ang inyong natutuhan mula sa teksto gamit ang isang pangungusap.",
                            "Halimbawa:",
                            "“Natutuhan ko na ang bagyo ay nakapipinsala sa tao at kalikasan kaya tayo ay dapat maghanda.”",
                            "“Natutuhan ko na ang bagyo ay nakapipinsala sa tao at kalikasan kaya tayo ay dapat maghanda.”",
    
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong. Basahin ang bawat tanong at piliin ang tamang sagot.",
                        ]
                    },
                    {
    
                        id: 9,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. Kailan nag-landfall ang Bagyong Kristine sa Isabela?",
                            "A) Oktubre 24, 2024",
                            "B) Oktubre 25, 2024",
                            "C) Nobyembre 4, 2024",
                            "D) Oktubre 23, 2024",
                        ],answer: "Answer: A) Oktubre 24, 2024"
                    },
                    {
    
                        id: 10,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Kung ikaw ay isang residente ng Batangas, anong hakbang ang maaari mong gawin upang matulungan ang iyong komunidad?",
                            "A) Magbigay ng tulong sa mga naapektuhan tulad ng pagkain at tubig.",
                            "B) Magtayo ng mga bagong negosyo para sa mga naapektuhan.",
                            "C) Ipagdiwang ang tagumpay ng komunidad.",
                            "D) Magpatuloy ng mga proyekto sa imprastruktura.",
                        ],answer: "correctAnswer: A) Magbigay ng tulong sa mga naapektuhan tulad ng pagkain at tubig."
                    },
                    {
    
                        id: 11,
                        layoutType: 'LAYOUT_7', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Ano ang layunin ni Pangulong Marcos sa pagdedeklara ng Nobyembre 4 bilang Day of National Mourning?",
                            "A) Upang ipagdiwang ang muling pagkabangon ng mga apektadong komunidad.",
                            "B) Bilang pakikiisa sa mga pamilya ng mga nasawi dulot ng Bagyong Kristine.",
                            "C) Upang magbigay ng mga bagong parangal sa mga namatay.",
                            "D) Para magsagawa ng mga programang rehabilitasyon.",
                        ],answer: "answer: B) Bilang pakikiisa sa mga pamilya ng mga nasawi dulot ng Bagyong Kristine."
                    },
                     {
    
                        id: 12,
                        layoutType: 'LAYOUT_7', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Ano ang ibig “sabihin ng bunsod nito” sa pangungusap: “Bunsod nito ang pagbaha sa mga probinsiya sa Rehiyon II at biglaang pagbaha at malawakang pagguho ng lupa sa Rehiyon IV-A o CALABARZON”?",
                            "A) Dahil dito",
                            "B) Bilang resulta",
                            "C) Pagkatapos ng pangyayaring iyon ",
                            "D) Dahil sa magandang epekto",
                        ],answer: "answer: A) Dahil dito"
                    },
                    {
    
                        id: 13,
                        layoutType: 'LAYOUT_7', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Ano ang pangunahing sanhi ng kamatayan ng karamihan sa mga nasawi sa Batangas?",
                            "A) Pagkalunod sa baha at pagguho ng lupa.",
                            "B) Pagkakaroon ng malubhang sakit.",
                            "C) Pagkasugat mula sa mga debris.",
                            "D) Pagkawala ng pagkain at tubig.",
                        ],answer: ["answer: A) Pagkalunod sa baha at pagguho ng lupa."]
                    },
                    // Add more slides as needed with different layoutTypes
                ]
            },
            2: {
                title: "Teksto 2: Pag-uwi sa Probinsiya",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_1', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Magandang araw, mga mag-aaral! Bago tayo magsimula, gusto kong ikuwento ninyo sa klase ang isang bakasyong hindi ninyo makalilimutan. Paano ito nakatulong sa inyo?",
                            "Halimbawa, maaari ninyong ikuwento ang tungkol sa pagpunta sa bahay ng inyong lolo’t lola at natutuhan ninyong magtulungan sa mga gawaing bahay",
                        ],
                        images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/having-grandparents-at-home-is-a-blessing.jpg"]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ang teksto na pinamagatang “Pag-uwi sa Probinsiya”. Pagkatapos, sagutin ang mga sumusunod na tanong:",
                            "1. Ano ang mga pangarap ni Maria sa buhay?",
                            "2. Paano nakatutulong ang kaniyang lola at tiyahin sa kaniyang mga pangarap?",
                            "3. Ano ang mga katangian ni Maria na nagpatitibay sa kaniya sa kabila ng mga pagsubok?"
                        ],
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Pag-uwi sa Probinsiya",
                        content: [
                            "Labis ang pagkasabik ni Maria tuwing sa panahon ng bakasyon dahil ito lamang ang pagkakataon niya na makauwi sa probinsiya at makasama ang kaniyang mahal na lola. Sa kabila ng masayang bakasyon, dama rin niya ang pangungulila sa kanyang ama at ina, na pumanaw na noong siya ay bata pa. Dahil dito, siya ay lumaki sa mapagmahal na kalinga ng kanyang lola.",
                            "Sa kasalukuyan, si Maria ay naninirahan kasama ang kanyang tiyahin na si Aling Perla, kapatid ng kaniyang yumaong ina. Si Aling Perla ang sumusuporta sa kaniyang pag-aaral sa isang kilalang Unibersidad sa Maynila. Sa kabila ng maraming pagsubok, Si Maria ay nagpamalas ng katatagan, kasipagan at determinasyon. Kilala siya bilang isang mahusay na mag-aaral na may prinsipyo at matibay na layuning makapagtapos ng pag-aaral upang makatulong sa kaniyang pamilya.",
                            "Para kay Maria, ang bawat pag-uwi sa probinsiya ay higit pa sa isang simpleng bakasyon. Ito ay isang pagkakataon upang sariwain ang mga alaala at muling damhin ang pinagmumulan ng kaniyang inspirasyon at mga pangarap."
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Narito naman ang isang hamon para sa inyo. Sagutin ang tanong:",
                            "Kung ikaw ang nasa sitwasyon ni Maria, paano mo ipakikita ang iyong determinasyon at pagsusumikap upang makapagtapos ng pag-aaral? Magbahagi ng iyong sagot sa klase.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Sa bahaging ito, hahatiin ng guro ang klase sa maliliit na pangkat.",
                            "Talakayin ninyo kung gaano kahalaga ang suporta ng pamilya sa pagbuo ng inyong mga pangarap. Gumawa ang bawat pangkat ng isang skit na nagpakikita kung paano nakatutulong ang pamilya sa inyong pag-aaral.",
    
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang isang bahagi ng teksto tungkol kay Maria at gayahin ang paraan ng aking pagbasa.",
                            "Si Maria ay nagpamalas ng katatagan, kasipagan, at determinasyon.",
                            "Pagkatapos, pag-usapan natin: Paano natin magagamit ang mga katangiang ito sa ating sariling buhay? Paano makatutulong ang mga ito kapag may mga pagsubok tayong kinahaharap?",
    
                        ], images: []
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Isipin ninyo ang mga katangian ni Maria—katatagan, kasipagan, at determinasyon. Ngayon, sumulat ng isang pangungusap tungkol sa kung paano ninyo magagamit ang mga katangiang ito sa pang-araw-araw na buhay. ",
                            "Halimbawa:",
                            "Katulad ni Maria, magsusumikap akong makatapos ng pag-aaral para matulungan ang aking pamilya.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: ["Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong sa ibaba. Basahin ang bawat tanong at piliin ang tamang sagot."]
                    },
                    {
                        id: 9,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. Ano ang dahilan ng pagkasabik ni Maria tuwing bakasyon?",
                            "A) Dahil sa masaya niyang buhay sa Maynila.",
                            "B) Dahil ito lamang ang pagkakataon niyang makauwi sa probinsiya at makasama ang kaniyang lola.",
                            "C) Dahil gusto niyang magtrabaho sa probinsiya.",
                            "D) Dahil nagkakaroon siya ng bagong mga kaibigan."
                        ],answer: "answer: B) Dahil ito lamang ang pagkakataon niyang makauwi sa probinsiya at makasama ang kaniyang lola."
                    },
                    {
                        id: 10,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Sino ang tumutustos sa pag-aaral ni Maria?",
                            "A) Ang kanyang lola",
                            "B) Ang kanyang tiyahin, si Aling Perla",
                            "C) Ang kanyang mga magulang",
                            "D) Ang kanyang mga kaibigan"
                        ],answer: "answer: B) Ang kanyang tiyahin, si Aling Perla"
                    },
                    {
                        id: 11,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Ano ang ipinakikita ni Maria sa kabila ng mga pagsubok na kaniyang kinaharap?",
                            "A) Pagkatalo at pag-aalala.",
                            "B) Katatagan, kasipagan, at determinasyon.",
                            "C) Pagpapabaya at pag-iiwas sa mga responsibilidad.",
                            "D) Pagkawala ng interes sa pag-aaral."
                        ],answer: "answer: B) Katatagan, kasipagan, at determinasyon."
                    },
                    {
                        id: 12,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Ano ang maaaring ipahiwatig ng pagkakaroon ni Maria ng mataas na prinsipyo at matibay na layunin?",
                            "A) Magiging matagumpay siya sa kaniyang buhay.",
                            "B) Hindi siya magiging interesado sa kaniyang pag-aaral.",
                            "C) Hindi siya makikipag-tulungan sa kanyang pamilya.",
                            "D) Magiging mahirap siya sa buhay.",
                        ],answer: "answer: A) Magiging matagumpay siya sa kaniyang buhay."
                    },
                    {
                        id: 13,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Ano ang maaaring layunin ni Maria sa kabila ng pagiging mahusay na mag-aaral?",
                            "A) Upang magpasikat sa iba.",
                            "B) Upang makalimot sa kanyang mga problema.",
                            "C) Upang magtayo ng negosyo.",
                            "D) Upang matulungan ang kaniyang pamilya at makapagtapos ng pag-aaral.",
                        ],answer: "answer: D) Upang matulungan ang kaniyang pamilya at makapagtapos ng pag-aaral."
                    },
                    // Add more slides as needed
                ]
            },
            3: {
                title: "Teksto 3: Hakbang Tungo sa Pag-unlad",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Bago tayo magsimula sa ating talakayan, mag-isip ng isang akdang nabasa ninyo na nagbigay ng inspirasyon o nagturo sa inyo ng mahalagang aral sa buhay. Ano ang natutuhan ninyo mula rito, at paano ninyo ito nagamit sa isang sitwasyon sa inyong buhay? ",
                            "Halimbawa, ito ba ay tumulong sa inyo na makapagdesisyon nang mas maayos o makipag-ugnayan sa ibang tao?",
                        ],
                        images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-17-535275361-e1735979087566.png"]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ninyo ang teksto na pinamagatang “Hakbang Tungo sa Pag-unlad” at pagkatapos ay sagutin ang mga sumusunod na tanong:",
                            "1. Paano nakatutulong ang pagbabasa sa pagpapalawak ng imahinasyon?",
                            "2. Ano ang epekto ng pagbabasa sa ating bokabularyo?",
                            "3. Paano nakatutulong ang pagbabasa sa pagpapalakas ng lohikal at kritikal na pag-iisip?"
                        ],
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Ang PhilSys Act",
                        content: [
                            "Ang pagbabasa ay isang kasanayan na dapat pagyamanin ng bawat tao dahil sa malalim ang magiging epekto nito sa ating buhay. Sa bawat pahina na ating binabasa, tayo ay natututo at nakatutuklas ng mga bagong kaalaman na nagpalalakas sa ating kakayahan sa pagsusuri ng mga nangyayari sa ating kapaligiran. ",
                            "Sa pamamagitan ng pagbabasa, nagiging malawak ang ating imahinasyon na nakatutulong upang magkaroon tayo ng lohikal at kritikal na pag-iisip. Higit pa rito, ito din ay nagpalalawak ng ating bokabolaryo. Nakasasabay tayo sa paggamit ng mga bagong salita na naiimbento at nagiging bahagi ng ating wika dala ng makabagong panahon. ",
                            "Kaya’t huwag sayangin ang panahon, tangkilikin ang pagbabasa. Ang paglalaan ng oras dito ay isa sa mga mahahalagang hakbang para sa personal na paglago. Kung nais mong mapabuti sa hinaharap, magsimula kang magbasa ngayon din. "
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Narito naman ang isang hamon sa inyo, sagutin ang tanong: Kung ikaw ay magbabasa ng bagong libro, anong tanong ang gusto mong sagutin o matutuhan mula rito?",
                            "Halimbawa:",
                            "“Ano kaya ang matututuhan ko tungkol sa aking sarili mula sa aklat na ito?”"
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Sa bahaging ito, hahatiin ng guro sa maliliit na pangkat ang klase.",
                            "Pag-usapan sa inyong pangkat kung paano nakatulong ang pagbabasa sa inyong mga layunin sa buhay. Halimbawa, may natutuhan ba kayo tungkol sa pagsisikap, pananampalataya, o disiplina mula sa inyong mga paboritong libro? Pag-usapan din ang inyong mga paboritong aklat at kung paano nito binago ang inyong pananaw. Pagkatapos, ibahagi sa klase ang napag-usapan.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang isang bahagi ng teksto tungkol sa pagbabasa at gayahin ang paraan ng aking pagbasa.",
                            "“Ang pagbabasa ay isang kasanayan na dapat pagyamanin ng bawat tao...”",
                            "Pagkatapos, pag-usapan natin: Anong bagong salita ang iyong natutuhan mula rito? Paano mo ito magagamit sa pang-araw-araw na usapan?",
                        ], images: []
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Ngayong natapos ninyong basahin at suriin ang teksto, sumulat ng maikling repleksyon tungkol sa kung paano ninyo isasabuhay ang mga natutuhan tungkol sa pagbabasa.",
                            "Halimbawa:",
                            "“Gusto kong maglaan ng kahit 15 minuto araw-araw para magbasa at matuto ng bagong bagay.”",
                            "“Ang pagbabasa ay magbibigay sa akin ng ideya kung paano magtagumpay sa buhay.”"
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-19.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong sa ibaba. Basahin ang bawat tanong at piliin ang tamang sagot."]
                    },
                    {
                        id: 9,
                        layoutType: 'LAYOUT_13', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. 1. Ano ang epekto ng pagbabasa sa bokabularyo ng isang tao?",
                            "A) Pinapalawak nito ang bokabularyo.",
                            "B) Pinapaliit nito ang bokabularyo.",
                            "C) Hindi ito nakaaapekto sa bokabularyo.",
                            "D) Binabawasan nito ang bilang ng mga salitang alam ng tao."
                        ],answer: "answer: A) Pinapalawak nito ang bokabularyo."
                    },
                    {
                        id: 10,
                        layoutType: 'LAYOUT_14', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Paano nakatutulong ang pagbabasa sa pagpapalawak ng kritikal na pag-iisip ng isang tao?",
                            "A) Nagbibigay ito ng kaalaman at nagpalalawak ng pananaw sa mga bagay-bagay.",
                            "B) Hindi ito nakatutulong sa pagpalalawak ng kritikal na pag-iisip.",
                            "C) Nagpatataas ito ng antas ng edukasyon ngunit hindi ng kritikal na pag-iisip.",
                            "D) Pinalalawak nito ang mga teknik sa pagsulat ngunit hindi ang pag-iisip."
                        ],answer: "answer: A) Nagbibigay ito ng kaalaman at nagpalalawak ng pananaw sa mga bagay-bagay."
                    },
                    {
                        id: 11,
                        layoutType: 'LAYOUT_15', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Bakit mahalaga ang pagbabasa ayon sa teksto?",
                            "A) Dahil ito ay isang libangan lamang.",
                            "B) Dahil ito ay nagpalalawak ng bokabularyo at nagiging sanhi ng personal na paglago.",
                            "C) Dahil ito ay hindi nakakapagod.",
                            "D) Dahil hindi ito nakatutulong sa mga mag-aaral."
                        ],answer: "answer: B) Dahil ito ay nagpalalawak ng bokabularyo at nagiging sanhi ng personal na paglago."
                    },
                    {
                        id: 12,
                        layoutType: 'LAYOUT_16', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Bakit sinabi ng may-akda na ang pagbabasa ay “susi sa pag-unlad at tagumpay”?",
                            "A) Dahil ito ay nagpalalawak ng pananaw at nagbibigay ng mahahalagang kaalaman na makatutulong sa tagumpay.",
                            "B) Dahil ang pagbabasa ay palaging nakauubos ng oras.",
                            "C) Dahil ang pagbabasa ay hindi nakapagbibigay ng kaalaman.",
                            "D) Dahil ang pagbabasa ay hindi nakapagbibigay ng anumang benepisyo sa buhay."
                        ],answer: "answer: A) Dahil ito ay nagpalalawak ng pananaw at nagbibigay ng mahahalagang kaalaman na makatutulong sa tagumpay."
                    },
                    {
                        id: 13,
                        layoutType: 'LAYOUT_17', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Ano ang layunin ng may-akda sa pagsasabi ng “huwag sayangin ang panahon, tangkilikin ang pagbabasa”?",
                            "A) Hikayatin ang mga tao na maglaan ng oras sa pagbabasa at magamit ito bilang hakbang para sa personal na pag-unlad.",
                            "B) Hikayatin ang mga tao na magpahinga at huwag magbasa.",
                            "C) Hikayatin ang mga tao na maglaro at huwag magbasa.",
                            "D) Magbigay ng kaalaman sa tamang pag-aalaga ng mga libro."
                        ],answer: "answer: A) Hikayatin ang mga tao na maglaan ng oras sa pagbabasa at magamit ito bilang hakbang para sa personal na pag-unlad."
                    },
                    // Add more slides as needed with different layoutTypes
                ]
            },
            4: {
                title: "Teksto 4: Paghahanda sa Lindol",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_1', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Magandang araw, mga mag-aaral! Mangyaring mag-isip ng isang karanasan kung saan kayo ay nakaranas ng lindol. Ano ang inyong natutuhan mula sa karanasang iyon?" ,
                            "Magbahagi ng kuwento sa klase at ipaliwanag kung paano nakatulong ang mga hakbang ng “Duck, Cover and Hold” sa inyong kaligtasan.",
    
                        ],
                        images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/duckcoverhold.jpg"]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ang teksto na pinamagatang “Paghahanda sa Lindol”. Pagkatapos, sagutin ang mga sumusunod na tanong:",
                            "1. Bakit mahalaga ang pagsunod sa tamang hakbang ng Duck, Cover, and Hold?",
                            "2. Ano ang mga dapat gawin bago, habang, at pagkatapos ng lindol upang matiyak ang kaligtasan?",
                            "3. Ano ang epekto ng mga earthquake drills sa pagiging handa ng isang komunidad?"
                        ],
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Paghahanda sa Lindol",
                        content: [
                            "Naglabas ang National Disaster Risk Reduction & Management Council o mas kilala bilang NDRRMC ng memorandum Blg. 13, s. 2024 kaugnay sa skedyul ng Nationwide Simultaneous Earthquake Drill o NSED para sa taong 2024.",
                            "Layunin ng NSED na sanayin ang mga mamamayan sa tamang pagsasagawa ng Duck, Cover and Hold, na mahalaga upang mapanatiling ligtas ang bawat mamamayan sa paaralan, opisina at komunidad.",
                            "Ang regular na pagsasagawa ng earthquake drill ay nagbibigay-daan sa mga mamamayan upang maging handa sa lahat ng oras, dahil hindi tiyak kung kailan mangyayari ang isang sakuna. Ang tamang pagsunod sa proseso ng Duck, Cover, and Hold ay maaaring makapagligtas ng buhay sa panahon ng lindol at iba pang kalamidad.",
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Pagkatapos ninyong masagot ang mga tanong, kayo naman ang bubuo ng tanong na gusto ninyong itanong tungkol sa paghahanda sa lindol.",
                            "Halimbawa:",
                            "Paano kung walang matatag na mesa o lamesa, ano ang ibang paraan para mag-Duck, Cover, and Hold?",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Pagkatapos masagot ang mga tanong, hahatiin ng guro ang klase sa maliliit na pangkat.",
                            "Pag-usapan ninyong pangkat ang mga dapat gawin sa oras ng lindol. Pagkatapos, ibahagi sa klase ang inyong napag-usapan.",
    
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ang guro ay magsagawa ng isang demostrasyon ng “Duck, Cover, and Hold” sa klase. Ipakikita ang tamang posisyon na dapat gawin tuwing may lindol at ipaliliwanag kung paano ito nakatutulong upang mapanatili ang kaligtasan. Gagayahin ito ng mga mag-aaral pagkatapos ng demostrasyon.",
    
                        ],
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Ngayong natapos ninyong basahin at suriin ang teksto, sumulat ng isang repleksyon tungkol sa kung paano kayo magiging handa sa susunod na lindol o sakuna. Ano ang mga hakbang na maaari niyong gawin upang maging ligtas at handa sa oras ng sakuna?",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-19.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: ["Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong sa ibaba. Basahin ang bawat tanong at piliin ang tamang sagot.",]
                    },
                    {
                        id: 9,
                        layoutType: 'LAYOUT_13', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. Anong proseso ang tinuturo sa mga mamamayan tuwing may earthquake drill?",
                            "A) Pag-aalaga ng hayop",
                            "B) Pagbabalot ng mga gamit",
                            "C) Duck, Cover, and Hold",
                            "D) Pag-akyat at upo"
                        ],answer: "answer: C) Duck, Cover, and Hold"
                    },
                    {
                        id: 10,
                        layoutType: 'LAYOUT_14', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Bakit mahalaga ang pagsunod sa Duck, Cover, and Hold sa panahon ng lindol?",
                            "A) Upang maiwasan ang pagkabigo sa mga drills.",
                            "B) Upang maprotektahan ang sarili mula sa mga falling debris at iba pang panganib.",
                            "C) Upang matutuhan ang bagong mga teknik sa pagbabalik-loob.",
                            "D) Upang makagawa ng mga proyekto sa komunidad."
                        ],answer: "answer: B) Upang maprotektahan ang sarili mula sa mga falling debris at iba pang panganib."
                    },
                    {
                        id: 11,
                        layoutType: 'LAYOUT_15', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Aling ahensya ang naglabas ng memorandum para sa Nationwide Simultaneous Earthquake Drill 2024?",
                            "A) Department of Education (DepEd)",
                            "B) National Disaster Risk Reduction and Management Council (NDRRMC)",
                            "C) Department of Health (DOH)",
                            "D) Department of Transportation (DOTr)"
                        ],answer: "answer: B) National Disaster Risk Reduction and Management Council (NDRRMC)"
                    },
                    {
                        id: 12,
                        layoutType: 'LAYOUT_16', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Ano ang maaaring mangyari kung hindi isasagawa ang earthquake drills?",
                            "A) Lahat ng mamamayan ay matututo ng mga bagong sayaw.",
                            "B) Ang mga mamamayan ay maaaring maging hindi handa kapag dumating ang lindol.",
                            "C) Hindi na kailangan ng mga evacuation centers.",
                            "D) Mas lalakas ang lindol sa susunod na pagkakataon."
                        ],answer: "answer: B) Ang mga mamamayan ay maaaring maging hindi handa kapag dumating ang lindol."
                    },
                    {
                        id: 13,
                        layoutType: 'LAYOUT_17', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Bakit mahirap tiyakin kung kailan magaganap ang isang lindol?",
                            "A) Dahil ito ay isang natural na sakuna na walang tiyak na oras ng pagdating.",
                            "B) Dahil hindi ito nakasalalay sa panahon.",
                            "C) Dahil ang mga siyentipiko ay hindi naniniwala sa lindol.",
                            "D) Dahil ito ay isang uri ng artipisyal na sakuna."
                        ],answer: "answer: A) Dahil ito ay isang natural na sakuna na walang tiyak na oras ng pagdating."
                    },
                    // Add more slides as needed
                ]
                // Add slides for Instructional 4 as needed
            },
            5: {
                title: "Teskto 5: Ang Pagtulong sa Kapwa",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Bago tayo magsimula, magbahagi sa klase ng kuwento tungkol sa isang pagkakataon na ikaw ay tumulong sa iba. Paano ito nakapagbigay ng saya sa iyo at sa taong natulungan mo?",
                            "Kapag matagal akong naglalaro sa cellphone, sumasakit ang aking mata at nahihirapan akong matulog."
                        ]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ang teksto na pinamagatang “Ang Pagtulong sa Kapwa”. Pagkatapos, sagutin ang mga sumusunod na tanong:"],
                        questions: ["Bakit mahalaga ang pagtulong sa kapuwa?", "Ano ang mga halimbawa ng pagtulong na maaari mong gawin araw-araw?", "Paano nakatutulong ang pagtulong sa iyong personal na pag-unlad?"],
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Ang Pagtulong sa Kapuwa",
                        content: [
                            "Ang pagtulong sa kapuwa ay isang mahalagang aspeto ng ating pagiging tao. Sa pamamagitan nito, naipamamalas natin ang malasakit at pagmamahal sa ating kapuwa. Hindi matatawaran ang bawat tulong na ating ipinagkakaloob, maliit man ito o malaki, dahil ito ay nagbibigay ngiti sa kanilang mga labi at nagpaparamdam ng kagalakan sa ating puso.",
                            "Sa tuwing tayo ay nagmamalasakit sa iba, napalalago rin natin ang ating sarili at ang ating pagkatao. Ang bawat mabuting gawa ay nagiging daan upang mas mapabuti ang ating mga relasyon. Kaya’t patuloy tayong magpakita ng malasakit at pagtulong sa kapuwa, dahil sa bawat kabutihang nagagawa natin, nagiging magaan ang ating buhay.",
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Matapos ninyong masagot ang mga tanong, kayo naman ang bibigyan ng pagkakataon na bumuo ng tanong tungkol sa binasang teksto at ibahagi ito sa klase. ",
                            "Halimbawa:",
                            "“Paano ba nakatutulong ang pagtulong sa ating komunidad?”"
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Pagkatapos masagot ang mga tanong sa klase, hahatiin ng guro ang klase sa maliliit na pangkat.",
                            "Pag-usapan sa inyong pangkat kung ano sa tingin ninyo ang mga aktibidad na makatutulong sa mga miyembro ng komunidad? Halimbawa, maaari kayong mag-isip ng mga aktibidad tulad ng pagtulong sa mga senior citizens, pagbibigay ng mga donasyon, o paglilinis sa paligid. Ano ang plano ninyo, at paano ninyo ito ipaaabot sa mga tao sa iyong komunidad? Ibahagi sa klase ang napang-usapang ng inyong pangkat.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang teksto tungkol sa pagtulong sa kapuwa at gayahin ang paraan ng aking pagbasa.",
                        ]
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang teksto tungkol sa pagtulong sa kapuwa at gayahin ang paraan ng aking pagbasa.",
                            "“Ano ang natutunan mo tungkol sa pagtulong sa kapuwa, at paano mo ito isasabuhay sa araw-araw?”"
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-19.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: ["Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong sa ibaba. Basahin ang bawat tanong at piliin ang tamang sagot."]
                    },
                    {
                        id: 9,
                        layoutType: 'LAYOUT_13', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. Ano ang pangunahing layunin ng pagtulong sa kapuwa ayon sa tekstong binasa?",
                            "A) Magpakita ng kapangyarihan.",
                            "B) Magbigay ng materyal na bagay lamang.",
                            "C) Ipinamalas ang malasakit at pagmamahal.",
                            "D) Maging sikat sa komunidad."
                        ],answer: "answer: C) Ipinamalas ang malasakit at pagmamahal."
                    },
                    {
                        id: 10,
                        layoutType: 'LAYOUT_14', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Bakit mahalaga ang bawat mabuting gawa ayon sa teksto?",
                            "A) Dahil ito ay nagpapalakas sa katawan.",
                            "B) Dahil ito ay nagpabubuti ng ating mga relasyon.",
                            "C) Dahil ito ay nagdudulot ng materyal na benepisyo.",
                            "D) Dahil ito ay nagiging sanhi ng kasikatan."
                        ],answer: "answer: B) Dahil ito ay nagpabubuti ng ating mga relasyon."
                    },
                    {
                        id: 11,
                        layoutType: 'LAYOUT_15', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Ano ang maaaring mangyari sa isang tao na hindi nagmamalasakit at hindi tumutulong sa kapuwa?",
                            "A) Magiging magaan ang kanilang buhay.",
                            "B) Maaaring mawalan ng magandang relasyon sa ibang tao.",
                            "C) Laging magiging maligaya.",
                            "D) Magiging popular siya sa komunidad."
                        ],answer: "answer: B) Maaaring mawalan ng magandang relasyon sa ibang tao."
                    },
                    {
                        id: 12,
                        layoutType: 'LAYOUT_16', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Ayon sa teksto, ano ang epekto ng pagtulong sa kapuwa sa ating buhay?",
                            "A) Ito ay magdudulot ng higit pang problema.",
                            "B) Ito ay nagpadadali sa ating buhay.",
                            "C) Ito ay nagiging sanhi ng kasiyahan at pagpabubuti ng buhay.",
                            "D) Walang epekto ang pagtulong sa kapuwa sa ating buhay."
                        ],answer: "answer: C) Ito ay nagiging sanhi ng kasiyahan at pagpabubuti ng buhay."
                    },
                    {
                        id: 13,
                        layoutType: 'LAYOUT_17', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Ano ang maaaring ipahiwatig ng teksto tungkol sa kahalagahan ng pagtulong sa kapuwa sa ating komunidad?",
                            "A) Ang pagtulong ay walang epekto sa komunidad.",
                            "B) Ang pagtulong ay nagpalalaganap ng malasakit at pagkakaisa.",
                            "C) Ang pagtulong ay sanhi ng hidwaan sa komunidad.",
                            "D) Ang pagtulong ay hindi kinakailangan."
                        ],answer: "answer: B) Ang pagtulong ay nagpalalaganap ng malasakit at pagkakaisa."
                    },
                    // Add more slides as needed
                    // Add slides for Instructional 5 as needed
                ]
            }
            
    
        }
    },
    2: {
        title: "Frustation",
        subtopics: {
            1: {
                title: "Teksto 1: Simbolo ng Lakas at Sipag ng Pilipino",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_1', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Magandang araw, mga mag-aaral! Bago tayo magsimula, mangyaring ibahagi ninyo sa klase ang isang pagkakataon kung kailan ninyo nakita ang isang tao o hayop na nagpakita ng sipag at lakas.",
                            "Halimbawa, maaari mong sabihin:",
                            "Ang tatay ko ay parang kalabaw sa sipag sa pagtatrabaho."
                        ],
                        images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-22-1151336493-e1736008411504.png"]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ninyo ang teksto na pinamagatang “Simbolo ng Lakas at Sipag ng Pilipino” at pagkatapos ay sagutin ang mga sumusunod na tanong:",
                        ],
                        questions: ["Ano ang simbolismo ng kalabaw sa kultura ng Pilipinas?", "Paano nakatutulong ang kalabaw sa mga magsasaka sa kanilang trabaho?", "Anong mga katangian ng kalabaw ang nagsisilbing halimbawa ng sipag at lakas ng mga Pilipino?"]
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Simbolo ng Lakas at Sipag ng Pilipino",
                        content: [
                            "Ang kalabaw ang tinaguriang pambansang hayop ng Pilipinas. Sumasagisag ito sa kalakasan at kasipagan ng bawat Pilipino sa pagtahak sa mga araw-araw na gawain. Sa sakahan, ang kalabaw ang kaagapay ng mga magsasaka sa pag-aararo ng lupa o paghahanda ng mga taniman. Maliban sa pagtulong sa pag-aararo, ang kalabaw ay maaasahan din na pagbubuhat ng mabibigat na karga sa panahon ng anihan ng mga gulay at palay dahil sa taglay nitong lakas at katatagan.",
                            "Ang kalabaw ay isang simbulo rin ng sipag at dedikasyon ng bawat mamamayang Pilipino. Ito ay naglalarawan ng patuloy na paglaban at pagsusumikap upang makamit ang mga layunin sa buhay, sa kabila ng mga hamon at paghihirap na hinaharap.",
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Narito naman ang isang hamon para sa inyo. Sagutin ang tanong: “Kung ikaw ay magiging hayop, anong hayop ang pipiliin mo bilang simbolo ng iyong lakas at sipag? Bakit mo ito napili?”",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Sa bahaging ito, hahatiin ng guro ang klase sa maliliit na pangkat.",
                            "Pagkatapos magbahagi ng inyong mga sagot, pag-usapan naman sa inyong pangkat kung paano naging simbolo ng sipag at lakas ang kalabaw sa inyong komunidad. Pagkatapos, gumawa ng isang maikling kuwento o tula na naglalarawan sa mga katangian ng kalabaw.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang isang bahagi ng teksto tungkol sa kalabaw at gayahin ninyo ang aking paraan ng pagbasa:",
                            "“Ang kalabaw ay isang simbulo rin ng sipag at dedikasyon ng bawat mamamayang Pilipino.”",
                            "Ngayon, isipin ninyo, paano ba natin magagamit ang sipag at lakas ng kalabaw bilang inspirasyon sa pang-araw-araw nating buhay? Anong aral ang maaari nating makuha mula rito?",
                        ],
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Pagkatapos, sumulat ng isang pangungusap na nagpakikita kung paano ninyo magagamit ang mga katangian ng kalabaw sa inyong buhay.",
                            "Halimbawa:",
                            "“Katulad ng kalabaw, magpupursige ako sa pag-aaral para matulungan ko ang aking pamilya.”",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong. Basahin ang bawat tanong at piliin ang tamang sagot.",
                        ]
                    },
                    {
    
                        id: 9,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. Ano ang pangunahing tungkulin ng kalabaw sa sakahan?",
                            "A) Pagtulong sa mga magsasaka sa paghahanda ng mga kagamitan.",
                            "B) Pag-aararo ng lupa at pagbubuhat ng mabibigat na karga.",
                            "C) Pagtulong sa pagsasaka ng mga hayop.",
                            "D) Pag-aalaga ng mga hayop sa sakahan.",
                        ],answer: "answer: B) Pag-aararo ng lupa at pagbubuhat ng mabibigat na karga."
                    },
                    {
    
                        id: 10,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Paano sumasalamin ang kalabaw sa katangian ng mga Pilipino?",
                            "A) Sa pamamagitan ng katapangan.",
                            "B) Sa pamamagitan ng sipag at dedikasyon sa kabila ng mga pagsubok.",
                            "C) Sa pamamagitan ng pagiging matalino.",
                            "D) Sa pamamagitan ng pagiging magaan sa trabaho.",
                        ],answer: "answer: B) Sa pamamagitan ng sipag at dedikasyon sa kabila ng mga pagsubok."
                    },
                    {
    
                        id: 11,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Ano ang maaaring simbolismo ng kalabaw sa buhay ng mga Pilipino?",
                            "A) Patuloy na paglaban at pagsusumikap para sa mga layunin sa kabila ng hirap.",
                            "B) Laban sa mga kalikasan.",
                            "C) Pagkakaroon ng masaganang buhay sa sakahan.",
                            "D) Pagpapakita ng mga tradisyunal na pamamaraan sa pagsasaka.",
                        ],answer: "answer: B) Laban sa mga kalikasan."
                    },
                    {
    
                        id: 12,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Ano ang kahulugan ng kalabaw bilang “pambansang hayop” sa konteksto ng teksto?",
                            "A) Isang hayop na inaalagaan sa mga tahanan.",
                            "B) Isang hayop na kumakatawan sa kahalagahan ng agrikultura at kasipagan.",
                            "C) Isang hayop na ginagamit sa pangangalakal.",
                            "D) Isang hayop na mahirap alagaan.",
                        ],answer: "answer: B) Isang hayop na kumakatawan sa kahalagahan ng agrikultura at kasipagan."
                    },
                    {
    
                        id: 13,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Ano ang itinuturing na pambansang hayop ng Pilipinas?",
                            "A) Kalabaw",
                            "B) Agila",
                            "C) Karabao ",
                            "D) Kabayo",
                        ],answer: "answer: A) Kalabaw"
                    },
                    // Add more slides as needed with different layoutTypes
                ]
            },
            2: {
                title: "Teksto 2: Pag-uwi sa Probinsiya",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_1', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Magandang araw, mga mag-aaral! Bago tayo magsimula, gusto kong ikuwento ninyo sa klase ang isang bakasyong hindi ninyo makalilimutan. Paano ito nakatulong sa inyo?",
                            "Halimbawa, maaari ninyong ikuwento ang tungkol sa pagpunta sa bahay ng inyong lolo’t lola at natutuhan ninyong magtulungan sa mga gawaing bahay",
                        ],
                        images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/having-grandparents-at-home-is-a-blessing.jpg"]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ang teksto na pinamagatang “Pag-uwi sa Probinsiya”. Pagkatapos, sagutin ang mga sumusunod na tanong:",
                            "1. Ano ang mga pangarap ni Maria sa buhay?",
                            "2. Paano nakatutulong ang kaniyang lola at tiyahin sa kaniyang mga pangarap?",
                            "3. Ano ang mga katangian ni Maria na nagpatitibay sa kaniya sa kabila ng mga pagsubok?"
                        ],
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Pag-uwi sa Probinsiya",
                        content: [
                            "Labis ang pagkasabik ni Maria tuwing sa panahon ng bakasyon dahil ito lamang ang pagkakataon niya na makauwi sa probinsiya at makasama ang kaniyang mahal na lola. Sa kabila ng masayang bakasyon, dama rin niya ang pangungulila sa kanyang ama at ina, na pumanaw na noong siya ay bata pa. Dahil dito, siya ay lumaki sa mapagmahal na kalinga ng kanyang lola.",
                            "Sa kasalukuyan, si Maria ay naninirahan kasama ang kanyang tiyahin na si Aling Perla, kapatid ng kaniyang yumaong ina. Si Aling Perla ang sumusuporta sa kaniyang pag-aaral sa isang kilalang Unibersidad sa Maynila. Sa kabila ng maraming pagsubok, Si Maria ay nagpamalas ng katatagan, kasipagan at determinasyon. Kilala siya bilang isang mahusay na mag-aaral na may prinsipyo at matibay na layuning makapagtapos ng pag-aaral upang makatulong sa kaniyang pamilya.",
                            "Para kay Maria, ang bawat pag-uwi sa probinsiya ay higit pa sa isang simpleng bakasyon. Ito ay isang pagkakataon upang sariwain ang mga alaala at muling damhin ang pinagmumulan ng kaniyang inspirasyon at mga pangarap."
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Narito naman ang isang hamon para sa inyo. Sagutin ang tanong:",
                            "Kung ikaw ang nasa sitwasyon ni Maria, paano mo ipakikita ang iyong determinasyon at pagsusumikap upang makapagtapos ng pag-aaral? Magbahagi ng iyong sagot sa klase.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Sa bahaging ito, hahatiin ng guro ang klase sa maliliit na pangkat.",
                            "Talakayin ninyo kung gaano kahalaga ang suporta ng pamilya sa pagbuo ng inyong mga pangarap. Gumawa ang bawat pangkat ng isang skit na nagpakikita kung paano nakatutulong ang pamilya sa inyong pag-aaral.",
    
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang isang bahagi ng teksto tungkol kay Maria at gayahin ang paraan ng aking pagbasa.",
                            "Si Maria ay nagpamalas ng katatagan, kasipagan, at determinasyon.",
                            "Pagkatapos, pag-usapan natin: Paano natin magagamit ang mga katangiang ito sa ating sariling buhay? Paano makatutulong ang mga ito kapag may mga pagsubok tayong kinahaharap?",
    
                        ], images: []
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Isipin ninyo ang mga katangian ni Maria—katatagan, kasipagan, at determinasyon. Ngayon, sumulat ng isang pangungusap tungkol sa kung paano ninyo magagamit ang mga katangiang ito sa pang-araw-araw na buhay. ",
                            "Halimbawa:",
                            "Katulad ni Maria, magsusumikap akong makatapos ng pag-aaral para matulungan ang aking pamilya.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: ["Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong sa ibaba. Basahin ang bawat tanong at piliin ang tamang sagot."]
                    },
                    {
                        id: 9,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. Ano ang dahilan ng pagkasabik ni Maria tuwing bakasyon?",
                            "A) Dahil sa masaya niyang buhay sa Maynila.",
                            "B) Dahil ito lamang ang pagkakataon niyang makauwi sa probinsiya at makasama ang kaniyang lola.",
                            "C) Dahil gusto niyang magtrabaho sa probinsiya.",
                            "D) Dahil nagkakaroon siya ng bagong mga kaibigan."
                        ],answer: "answer: B) Dahil ito lamang ang pagkakataon niyang makauwi sa probinsiya at makasama ang kaniyang lola."
                    },
                    {
                        id: 10,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Sino ang tumutustos sa pag-aaral ni Maria?",
                            "A) Ang kanyang lola",
                            "B) Ang kanyang tiyahin, si Aling Perla",
                            "C) Ang kanyang mga magulang",
                            "D) Ang kanyang mga kaibigan"
                        ],answer: "answer: B) Ang kanyang tiyahin, si Aling Perla"
                    },
                    {
                        id: 11,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Ano ang ipinakikita ni Maria sa kabila ng mga pagsubok na kaniyang kinaharap?",
                            "A) Pagkatalo at pag-aalala.",
                            "B) Katatagan, kasipagan, at determinasyon.",
                            "C) Pagpapabaya at pag-iiwas sa mga responsibilidad.",
                            "D) Pagkawala ng interes sa pag-aaral."
                        ],answer: "answer: B) Katatagan, kasipagan, at determinasyon."
                    },
                    {
                        id: 12,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Ano ang maaaring ipahiwatig ng pagkakaroon ni Maria ng mataas na prinsipyo at matibay na layunin?",
                            "A) Magiging matagumpay siya sa kaniyang buhay.",
                            "B) Hindi siya magiging interesado sa kaniyang pag-aaral.",
                            "C) Hindi siya makikipag-tulungan sa kanyang pamilya.",
                            "D) Magiging mahirap siya sa buhay.",
                        ],answer: "answer: A) Magiging matagumpay siya sa kaniyang buhay."
                    },
                    {
                        id: 13,
                        layoutType: 'LAYOUT_20', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Ano ang maaaring layunin ni Maria sa kabila ng pagiging mahusay na mag-aaral?",
                            "A) Upang magpasikat sa iba.",
                            "B) Upang makalimot sa kanyang mga problema.",
                            "C) Upang magtayo ng negosyo.",
                            "D) Upang matulungan ang kaniyang pamilya at makapagtapos ng pag-aaral.",
                        ],answer: "answer: D) Upang matulungan ang kaniyang pamilya at makapagtapos ng pag-aaral."
                    },
                    // Add more slides as needed
                ]
            },
            3: {
                title: "Teksto 3: Hakbang Tungo sa Pag-unlad",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Bago tayo magsimula sa ating talakayan, mag-isip ng isang akdang nabasa ninyo na nagbigay ng inspirasyon o nagturo sa inyo ng mahalagang aral sa buhay. Ano ang natutuhan ninyo mula rito, at paano ninyo ito nagamit sa isang sitwasyon sa inyong buhay? ",
                            "Halimbawa, ito ba ay tumulong sa inyo na makapagdesisyon nang mas maayos o makipag-ugnayan sa ibang tao?",
                        ],
                        images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-17-535275361-e1735979087566.png"]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ninyo ang teksto na pinamagatang “Hakbang Tungo sa Pag-unlad” at pagkatapos ay sagutin ang mga sumusunod na tanong:",
                            "1. Paano nakatutulong ang pagbabasa sa pagpapalawak ng imahinasyon?",
                            "2. Ano ang epekto ng pagbabasa sa ating bokabularyo?",
                            "3. Paano nakatutulong ang pagbabasa sa pagpapalakas ng lohikal at kritikal na pag-iisip?"
                        ],
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Ang PhilSys Act",
                        content: [
                            "Ang pagbabasa ay isang kasanayan na dapat pagyamanin ng bawat tao dahil sa malalim ang magiging epekto nito sa ating buhay. Sa bawat pahina na ating binabasa, tayo ay natututo at nakatutuklas ng mga bagong kaalaman na nagpalalakas sa ating kakayahan sa pagsusuri ng mga nangyayari sa ating kapaligiran. ",
                            "Sa pamamagitan ng pagbabasa, nagiging malawak ang ating imahinasyon na nakatutulong upang magkaroon tayo ng lohikal at kritikal na pag-iisip. Higit pa rito, ito din ay nagpalalawak ng ating bokabolaryo. Nakasasabay tayo sa paggamit ng mga bagong salita na naiimbento at nagiging bahagi ng ating wika dala ng makabagong panahon. ",
                            "Kaya’t huwag sayangin ang panahon, tangkilikin ang pagbabasa. Ang paglalaan ng oras dito ay isa sa mga mahahalagang hakbang para sa personal na paglago. Kung nais mong mapabuti sa hinaharap, magsimula kang magbasa ngayon din. "
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Narito naman ang isang hamon sa inyo, sagutin ang tanong: Kung ikaw ay magbabasa ng bagong libro, anong tanong ang gusto mong sagutin o matutuhan mula rito?",
                            "Halimbawa:",
                            "“Ano kaya ang matututuhan ko tungkol sa aking sarili mula sa aklat na ito?”"
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Sa bahaging ito, hahatiin ng guro sa maliliit na pangkat ang klase.",
                            "Pag-usapan sa inyong pangkat kung paano nakatulong ang pagbabasa sa inyong mga layunin sa buhay. Halimbawa, may natutuhan ba kayo tungkol sa pagsisikap, pananampalataya, o disiplina mula sa inyong mga paboritong libro? Pag-usapan din ang inyong mga paboritong aklat at kung paano nito binago ang inyong pananaw. Pagkatapos, ibahagi sa klase ang napag-usapan.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang isang bahagi ng teksto tungkol sa pagbabasa at gayahin ang paraan ng aking pagbasa.",
                            "“Ang pagbabasa ay isang kasanayan na dapat pagyamanin ng bawat tao...”",
                            "Pagkatapos, pag-usapan natin: Anong bagong salita ang iyong natutuhan mula rito? Paano mo ito magagamit sa pang-araw-araw na usapan?",
                        ], images: []
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Ngayong natapos ninyong basahin at suriin ang teksto, sumulat ng maikling repleksyon tungkol sa kung paano ninyo isasabuhay ang mga natutuhan tungkol sa pagbabasa.",
                            "Halimbawa:",
                            "“Gusto kong maglaan ng kahit 15 minuto araw-araw para magbasa at matuto ng bagong bagay.”",
                            "“Ang pagbabasa ay magbibigay sa akin ng ideya kung paano magtagumpay sa buhay.”"
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-19.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong sa ibaba. Basahin ang bawat tanong at piliin ang tamang sagot."]
                    },
                    {
                        id: 9,
                        layoutType: 'LAYOUT_13', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. 1. Ano ang epekto ng pagbabasa sa bokabularyo ng isang tao?",
                            "A) Pinapalawak nito ang bokabularyo.",
                            "B) Pinapaliit nito ang bokabularyo.",
                            "C) Hindi ito nakaaapekto sa bokabularyo.",
                            "D) Binabawasan nito ang bilang ng mga salitang alam ng tao."
                        ],answer: "answer: A) Pinapalawak nito ang bokabularyo."
                    },
                    {
                        id: 10,
                        layoutType: 'LAYOUT_14', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Paano nakatutulong ang pagbabasa sa pagpapalawak ng kritikal na pag-iisip ng isang tao?",
                            "A) Nagbibigay ito ng kaalaman at nagpalalawak ng pananaw sa mga bagay-bagay.",
                            "B) Hindi ito nakatutulong sa pagpalalawak ng kritikal na pag-iisip.",
                            "C) Nagpatataas ito ng antas ng edukasyon ngunit hindi ng kritikal na pag-iisip.",
                            "D) Pinalalawak nito ang mga teknik sa pagsulat ngunit hindi ang pag-iisip."
                        ],answer: "answer: A) Nagbibigay ito ng kaalaman at nagpalalawak ng pananaw sa mga bagay-bagay."
                    },
                    {
                        id: 11,
                        layoutType: 'LAYOUT_15', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Bakit mahalaga ang pagbabasa ayon sa teksto?",
                            "A) Dahil ito ay isang libangan lamang.",
                            "B) Dahil ito ay nagpalalawak ng bokabularyo at nagiging sanhi ng personal na paglago.",
                            "C) Dahil ito ay hindi nakakapagod.",
                            "D) Dahil hindi ito nakatutulong sa mga mag-aaral."
                        ],answer: "answer: B) Dahil ito ay nagpalalawak ng bokabularyo at nagiging sanhi ng personal na paglago."
                    },
                    {
                        id: 12,
                        layoutType: 'LAYOUT_16', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Bakit sinabi ng may-akda na ang pagbabasa ay “susi sa pag-unlad at tagumpay”?",
                            "A) Dahil ito ay nagpalalawak ng pananaw at nagbibigay ng mahahalagang kaalaman na makatutulong sa tagumpay.",
                            "B) Dahil ang pagbabasa ay palaging nakauubos ng oras.",
                            "C) Dahil ang pagbabasa ay hindi nakapagbibigay ng kaalaman.",
                            "D) Dahil ang pagbabasa ay hindi nakapagbibigay ng anumang benepisyo sa buhay."
                        ],answer: "answer: A) Dahil ito ay nagpalalawak ng pananaw at nagbibigay ng mahahalagang kaalaman na makatutulong sa tagumpay."
                    },
                    {
                        id: 13,
                        layoutType: 'LAYOUT_17', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Ano ang layunin ng may-akda sa pagsasabi ng “huwag sayangin ang panahon, tangkilikin ang pagbabasa”?",
                            "A) Hikayatin ang mga tao na maglaan ng oras sa pagbabasa at magamit ito bilang hakbang para sa personal na pag-unlad.",
                            "B) Hikayatin ang mga tao na magpahinga at huwag magbasa.",
                            "C) Hikayatin ang mga tao na maglaro at huwag magbasa.",
                            "D) Magbigay ng kaalaman sa tamang pag-aalaga ng mga libro."
                        ],answer: "answer: A) Hikayatin ang mga tao na maglaan ng oras sa pagbabasa at magamit ito bilang hakbang para sa personal na pag-unlad."
                    },
                    // Add more slides as needed with different layoutTypes
                ]
            },
            4: {
                title: "Teksto 4: Paghahanda sa Lindol",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_1', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Magandang araw, mga mag-aaral! Mangyaring mag-isip ng isang karanasan kung saan kayo ay nakaranas ng lindol. Ano ang inyong natutuhan mula sa karanasang iyon?" ,
                            "Magbahagi ng kuwento sa klase at ipaliwanag kung paano nakatulong ang mga hakbang ng “Duck, Cover and Hold” sa inyong kaligtasan.",
    
                        ],
                        images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/duckcoverhold.jpg"]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ang teksto na pinamagatang “Paghahanda sa Lindol”. Pagkatapos, sagutin ang mga sumusunod na tanong:",
                            "1. Bakit mahalaga ang pagsunod sa tamang hakbang ng Duck, Cover, and Hold?",
                            "2. Ano ang mga dapat gawin bago, habang, at pagkatapos ng lindol upang matiyak ang kaligtasan?",
                            "3. Ano ang epekto ng mga earthquake drills sa pagiging handa ng isang komunidad?"
                        ],
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Paghahanda sa Lindol",
                        content: [
                            "Naglabas ang National Disaster Risk Reduction & Management Council o mas kilala bilang NDRRMC ng memorandum Blg. 13, s. 2024 kaugnay sa skedyul ng Nationwide Simultaneous Earthquake Drill o NSED para sa taong 2024.",
                            "Layunin ng NSED na sanayin ang mga mamamayan sa tamang pagsasagawa ng Duck, Cover and Hold, na mahalaga upang mapanatiling ligtas ang bawat mamamayan sa paaralan, opisina at komunidad.",
                            "Ang regular na pagsasagawa ng earthquake drill ay nagbibigay-daan sa mga mamamayan upang maging handa sa lahat ng oras, dahil hindi tiyak kung kailan mangyayari ang isang sakuna. Ang tamang pagsunod sa proseso ng Duck, Cover, and Hold ay maaaring makapagligtas ng buhay sa panahon ng lindol at iba pang kalamidad.",
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Pagkatapos ninyong masagot ang mga tanong, kayo naman ang bubuo ng tanong na gusto ninyong itanong tungkol sa paghahanda sa lindol.",
                            "Halimbawa:",
                            "Paano kung walang matatag na mesa o lamesa, ano ang ibang paraan para mag-Duck, Cover, and Hold?",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Pagkatapos masagot ang mga tanong, hahatiin ng guro ang klase sa maliliit na pangkat.",
                            "Pag-usapan ninyong pangkat ang mga dapat gawin sa oras ng lindol. Pagkatapos, ibahagi sa klase ang inyong napag-usapan.",
    
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ang guro ay magsagawa ng isang demostrasyon ng “Duck, Cover, and Hold” sa klase. Ipakikita ang tamang posisyon na dapat gawin tuwing may lindol at ipaliliwanag kung paano ito nakatutulong upang mapanatili ang kaligtasan. Gagayahin ito ng mga mag-aaral pagkatapos ng demostrasyon.",
    
                        ],
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Ngayong natapos ninyong basahin at suriin ang teksto, sumulat ng isang repleksyon tungkol sa kung paano kayo magiging handa sa susunod na lindol o sakuna. Ano ang mga hakbang na maaari niyong gawin upang maging ligtas at handa sa oras ng sakuna?",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-19.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: ["Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong sa ibaba. Basahin ang bawat tanong at piliin ang tamang sagot.",]
                    },
                    {
                        id: 9,
                        layoutType: 'LAYOUT_13', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. Anong proseso ang tinuturo sa mga mamamayan tuwing may earthquake drill?",
                            "A) Pag-aalaga ng hayop",
                            "B) Pagbabalot ng mga gamit",
                            "C) Duck, Cover, and Hold",
                            "D) Pag-akyat at upo"
                        ],answer: "answer: C) Duck, Cover, and Hold"
                    },
                    {
                        id: 10,
                        layoutType: 'LAYOUT_14', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Bakit mahalaga ang pagsunod sa Duck, Cover, and Hold sa panahon ng lindol?",
                            "A) Upang maiwasan ang pagkabigo sa mga drills.",
                            "B) Upang maprotektahan ang sarili mula sa mga falling debris at iba pang panganib.",
                            "C) Upang matutuhan ang bagong mga teknik sa pagbabalik-loob.",
                            "D) Upang makagawa ng mga proyekto sa komunidad."
                        ],answer: "answer: B) Upang maprotektahan ang sarili mula sa mga falling debris at iba pang panganib."
                    },
                    {
                        id: 11,
                        layoutType: 'LAYOUT_15', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Aling ahensya ang naglabas ng memorandum para sa Nationwide Simultaneous Earthquake Drill 2024?",
                            "A) Department of Education (DepEd)",
                            "B) National Disaster Risk Reduction and Management Council (NDRRMC)",
                            "C) Department of Health (DOH)",
                            "D) Department of Transportation (DOTr)"
                        ],answer: "answer: B) National Disaster Risk Reduction and Management Council (NDRRMC)"
                    },
                    {
                        id: 12,
                        layoutType: 'LAYOUT_16', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Ano ang maaaring mangyari kung hindi isasagawa ang earthquake drills?",
                            "A) Lahat ng mamamayan ay matututo ng mga bagong sayaw.",
                            "B) Ang mga mamamayan ay maaaring maging hindi handa kapag dumating ang lindol.",
                            "C) Hindi na kailangan ng mga evacuation centers.",
                            "D) Mas lalakas ang lindol sa susunod na pagkakataon."
                        ],answer: "answer: B) Ang mga mamamayan ay maaaring maging hindi handa kapag dumating ang lindol."
                    },
                    {
                        id: 13,
                        layoutType: 'LAYOUT_17', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Bakit mahirap tiyakin kung kailan magaganap ang isang lindol?",
                            "A) Dahil ito ay isang natural na sakuna na walang tiyak na oras ng pagdating.",
                            "B) Dahil hindi ito nakasalalay sa panahon.",
                            "C) Dahil ang mga siyentipiko ay hindi naniniwala sa lindol.",
                            "D) Dahil ito ay isang uri ng artipisyal na sakuna."
                        ],answer: "answer: A) Dahil ito ay isang natural na sakuna na walang tiyak na oras ng pagdating."
                    },
                    // Add more slides as needed
                ]
                // Add slides for Instructional 4 as needed
            },
            5: {
                title: "Teskto 5: Ang Pagtulong sa Kapwa",
                slides: [
                    {
                        id: 1,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "I. Konstruktibismo",
                        content: [
                            "Bago tayo magsimula, magbahagi sa klase ng kuwento tungkol sa isang pagkakataon na ikaw ay tumulong sa iba. Paano ito nakapagbigay ng saya sa iyo at sa taong natulungan mo?",
                            "Kapag matagal akong naglalaro sa cellphone, sumasakit ang aking mata at nahihirapan akong matulog."
                        ]
                    },
                    {
                        id: 2,
                        layoutType: 'LAYOUT_2', // Add layoutType
                        title: "II. Pagsisiyasat",
                        content: [
                            "Ngayon naman, basahin ang teksto na pinamagatang “Ang Pagtulong sa Kapwa”. Pagkatapos, sagutin ang mga sumusunod na tanong:"],
                        questions: ["Bakit mahalaga ang pagtulong sa kapuwa?", "Ano ang mga halimbawa ng pagtulong na maaari mong gawin araw-araw?", "Paano nakatutulong ang pagtulong sa iyong personal na pag-unlad?"],
                    },
                    {
                        id: 3,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "Ang Pagtulong sa Kapuwa",
                        content: [
                            "Ang pagtulong sa kapuwa ay isang mahalagang aspeto ng ating pagiging tao. Sa pamamagitan nito, naipamamalas natin ang malasakit at pagmamahal sa ating kapuwa. Hindi matatawaran ang bawat tulong na ating ipinagkakaloob, maliit man ito o malaki, dahil ito ay nagbibigay ngiti sa kanilang mga labi at nagpaparamdam ng kagalakan sa ating puso.",
                            "Sa tuwing tayo ay nagmamalasakit sa iba, napalalago rin natin ang ating sarili at ang ating pagkatao. Ang bawat mabuting gawa ay nagiging daan upang mas mapabuti ang ating mga relasyon. Kaya’t patuloy tayong magpakita ng malasakit at pagtulong sa kapuwa, dahil sa bawat kabutihang nagagawa natin, nagiging magaan ang ating buhay.",
                        ]
                    },
                    {
                        id: 4,
                        layoutType: 'LAYOUT_4', // Add layoutType
                        title: "III. Pagtatanong",
                        content: [
                            "Matapos ninyong masagot ang mga tanong, kayo naman ang bibigyan ng pagkakataon na bumuo ng tanong tungkol sa binasang teksto at ibahagi ito sa klase. ",
                            "Halimbawa:",
                            "“Paano ba nakatutulong ang pagtulong sa ating komunidad?”"
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/img3.png"]
                    },
                    {
                        id: 5,
                        layoutType: 'LAYOUT_3', // Add layoutType
                        title: "IV. Pagkatutong Pampamayanan",
                        content: [
                            "Pagkatapos masagot ang mga tanong sa klase, hahatiin ng guro ang klase sa maliliit na pangkat.",
                            "Pag-usapan sa inyong pangkat kung ano sa tingin ninyo ang mga aktibidad na makatutulong sa mga miyembro ng komunidad? Halimbawa, maaari kayong mag-isip ng mga aktibidad tulad ng pagtulong sa mga senior citizens, pagbibigay ng mga donasyon, o paglilinis sa paligid. Ano ang plano ninyo, at paano ninyo ito ipaaabot sa mga tao sa iyong komunidad? Ibahagi sa klase ang napang-usapang ng inyong pangkat.",
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-18-2404956912-e1735980291152.png"]
                    },
                    {
                        id: 6,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "V. Pagmomodelo",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang teksto tungkol sa pagtulong sa kapuwa at gayahin ang paraan ng aking pagbasa.",
                        ]
                    },
                    {
                        id: 7,
                        layoutType: 'LAYOUT_5', // Add layoutType
                        title: "VI. Pagninilay",
                        content: [
                            "Ngayon naman, pakinggan ninyo habang binabasa ko ang teksto tungkol sa pagtulong sa kapuwa at gayahin ang paraan ng aking pagbasa.",
                            "“Ano ang natutunan mo tungkol sa pagtulong sa kapuwa, at paano mo ito isasabuhay sa araw-araw?”"
                        ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-19.png"]
                    },
                    {
                        id: 8,
                        layoutType: 'LAYOUT_6', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: ["Upang masuri kung naintindihan ninyo ang teksto, sagutin ang mga inihandang tanong sa ibaba. Basahin ang bawat tanong at piliin ang tamang sagot."]
                    },
                    {
                        id: 9,
                        layoutType: 'LAYOUT_13', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "1. Ano ang pangunahing layunin ng pagtulong sa kapuwa ayon sa tekstong binasa?",
                            "A) Magpakita ng kapangyarihan.",
                            "B) Magbigay ng materyal na bagay lamang.",
                            "C) Ipinamalas ang malasakit at pagmamahal.",
                            "D) Maging sikat sa komunidad."
                        ],answer: "answer: C) Ipinamalas ang malasakit at pagmamahal."
                    },
                    {
                        id: 10,
                        layoutType: 'LAYOUT_14', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "2. Bakit mahalaga ang bawat mabuting gawa ayon sa teksto?",
                            "A) Dahil ito ay nagpapalakas sa katawan.",
                            "B) Dahil ito ay nagpabubuti ng ating mga relasyon.",
                            "C) Dahil ito ay nagdudulot ng materyal na benepisyo.",
                            "D) Dahil ito ay nagiging sanhi ng kasikatan."
                        ],answer: "answer: B) Dahil ito ay nagpabubuti ng ating mga relasyon."
                    },
                    {
                        id: 11,
                        layoutType: 'LAYOUT_15', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "3. Ano ang maaaring mangyari sa isang tao na hindi nagmamalasakit at hindi tumutulong sa kapuwa?",
                            "A) Magiging magaan ang kanilang buhay.",
                            "B) Maaaring mawalan ng magandang relasyon sa ibang tao.",
                            "C) Laging magiging maligaya.",
                            "D) Magiging popular siya sa komunidad."
                        ],answer: "answer: B) Maaaring mawalan ng magandang relasyon sa ibang tao."
                    },
                    {
                        id: 12,
                        layoutType: 'LAYOUT_16', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "4. Ayon sa teksto, ano ang epekto ng pagtulong sa kapuwa sa ating buhay?",
                            "A) Ito ay magdudulot ng higit pang problema.",
                            "B) Ito ay nagpadadali sa ating buhay.",
                            "C) Ito ay nagiging sanhi ng kasiyahan at pagpabubuti ng buhay.",
                            "D) Walang epekto ang pagtulong sa kapuwa sa ating buhay."
                        ],answer: "answer: C) Ito ay nagiging sanhi ng kasiyahan at pagpabubuti ng buhay."
                    },
                    {
                        id: 13,
                        layoutType: 'LAYOUT_17', // Add layoutType
                        title: "VII. Awtentikong Pagtataya",
                        content: [
                            "5. Ano ang maaaring ipahiwatig ng teksto tungkol sa kahalagahan ng pagtulong sa kapuwa sa ating komunidad?",
                            "A) Ang pagtulong ay walang epekto sa komunidad.",
                            "B) Ang pagtulong ay nagpalalaganap ng malasakit at pagkakaisa.",
                            "C) Ang pagtulong ay sanhi ng hidwaan sa komunidad.",
                            "D) Ang pagtulong ay hindi kinakailangan."
                        ],answer: "answer: B) Ang pagtulong ay nagpalalaganap ng malasakit at pagkakaisa."
                    },
                    // Add more slides as needed
                    // Add slides for Instructional 5 as needed
                ]
            }
        }
    },
    3: {
    title: "Non-Reader",
    subtopics: {
      1: {
          title: "Non-Reader 1",
          slides: [
    
            {
              id: 1,
              layoutType: 'LAYOUT_9', // Add layoutType
              title: "I. Konstruktibismo",
              content: [
                  "Magandang araw, mga mag-aaral! Bago tayo magsimula sa ating talakayan, maghanda para sa isang masayang gawain. Makinig nang mabuti sa awit na aking ipatutugtog. Kung alam ninyo ang kanta, sabayan itong kantahin. ",
                  "Pagkatapos, sagutin ang tanong na ito: Ano ang napansin ninyo sa mga salitang ginamit sa awitin?",
                ], videoEmbed: "<iframe width=\"100%\" height=\"auto\" src=\"https://www.youtube.com/embed/XBaggiQXqOs\"  frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"          },
          {
              id: 2,
              layoutType: 'LAYOUT_2', // Add layoutType
              title: "II. Pagsisiyasat",
              content: [
                  "Sa bahaging ito, ating kilalanin ang mga titik ng alpabetong Filipino. Makinig nang mabuti habang binibigkas ko ang bawat titik. Pagkatapos, subukang ulitin ang mga ito at tukuyin ang titik na aking ipakikita.",
                  "Aa.  Bb.  Cc.  Dd.  Ee.  Ff.  Gg.  Hh.  Ii.  Jj.  Kk. Ll.  Mm.  Nn.  Ññ.  NGng.  Oo.  Pp.  Qq.  Rr.  Ss.  Tt.  Uu.  Vv.  Ww.  Xx.  Yy.  Zz.",
              ],
              images: [""]
          },
          {
              id: 3,
              layoutType: 'LAYOUT_3', // Add layoutType
              title: "III. Pagtatanong",
              content: [
                  "Batay sa ating tinalakay, may mga bahagi ba na hindi ninyo lubos na naunawaan? Ano pa ang nais ninyong malaman tungkol sa paksa? ",
                  "Kung mayroon kayong mga katanungan o ideya na nais ibahagi, itaas ang inyong kamay at magbahagi sa klase upang masagot natin ito nang sama-sama"
              ], 
          },
          {
              id: 4,
              layoutType: 'LAYOUT_3', // Add layoutType
              title: "IV. Pagkatutong Pampamayanan",
              content: [
                  "Pagkatapos masagot ng guro ang mga tanong sa klase, hahatiin ito sa maliliit na pangkat.  ",
                  "Ang bawat pangkat ay magpapraktis ng pagbigkas ng mga titik sa Alpabetong Filipino hanggang sa ito ay makabisado ng lahat ng miyembro. Pagkatapos, ito ay babasahin sa harap ng klase.",
              ], 
          },
          {
              id: 5,
              layoutType: 'LAYOUT_1',// Add layoutType
              title: "V. Pagmomodelo",
              content: [
                  "Sa bahaging ito, matututuhan ninyo ang mga tunog ng bawat titik sa Alpabetong Filipino. Babasahin ko ang tunog ng bawat titik at magbibigay ako ng halimbawang salita ng titik na iyon. Pagkatapos kong basahin ang mga tunog at halimbawa, kayo naman ang susubok na bumasa. Tiyakin na tama ang bigkas ng bawat titik at salita. ",
                  ""
              ], images: ["hhttps://ehub81.wordpress.com/wp-content/uploads/2025/01/1.png","https://ehub81.wordpress.com/wp-content/uploads/2025/01/2.png","https://ehub81.wordpress.com/wp-content/uploads/2025/01/3-1842515611-e1736477887504.png"]
          },
          {
              id: 6,
              layoutType: 'LAYOUT_5', // Add layoutType
              title: "VI. Pagninilay",
              content: [
                  "Ngayong natapos natin na mapag-aralan ang mga tunog, titik, at salita, maglaan ng oras upang pagnilayan ang inyong natutuhan. Sagutin ang mga sumusunod na tanong at ibahagi ang inyong sagot sa klase:",
                  "Ano ang pinakanatutuhan mo sa ating talakayan?",
                  "Bakit mahalagang pag-aralan ang wastong tunog, titik, at salita?" ,
                  "Paano mo magagamit ang iyong natutunan sa pang-araw-araw na buhay?"
              ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-19.png"]
          },
          {
              id: 7,
              layoutType: 'LAYOUT_1', // Add layoutType
              title: "VII. Awtentikong Pagtataya",
              content: [
                  "Upang masuri kung naintindihan ninyo ang tinalakay, sagutin ang inihandang gawain. Tukuyin ang unang tunong ng mga larawan. ",
              ]
          },
           {
              id: 8,
              layoutType: 'LAYOUT_1', // Add layoutType
              title: "VII. Awtentikong Pagtataya",
              content: [
                  "1.",
                  "A) h",
                  "B) k",
                  "C) g",
                  "D) j"
              ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-3-3695189742-e1736478670840.png"]
          },
          {
              id: 9,
              layoutType: 'LAYOUT_1', // Add layoutType
              title: "VII. Awtentikong Pagtataya",
              content: [
                  "2.",
                  "A) m",
                  "B) f",
                  "C) q",
                  "D) p"
              ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-4-1109691213-e1736478776394.png"]
          },
          {
              id: 10,
              layoutType: 'LAYOUT_1', // Add layoutType
              title: "VII. Awtentikong Pagtataya",
              content: [
                  "3.",
                  "A) o",
                  "B) u",
                  "C) i",
                  "D) e"
              ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-4-1109691213-e1736478776394.png"]
          },
          {
              id: 11,
              layoutType: 'LAYOUT_1', // Add layoutType
              title: "VII. Awtentikong Pagtataya",
              content: [
                  "4.",
                  "A) m",
                  "B) n",
                  "C) s",
                  "D) ng"
              ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-6.png"]
          },
          {
              id: 12,
              layoutType: 'LAYOUT_1', // Add layoutType
              title: "VII. Awtentikong Pagtataya",
              content: [
                  "5.",
                  "A) b",
                  "B) d",
                  "C) v",
                  "D) j"
              ], images: ["https://ehub81.wordpress.com/wp-content/uploads/2025/01/untitled-design-7.png"]
          },
              // Add more slides as needed with different layoutTypes
          ]
      },
      
    }
    },
  // Add more main topics as needed
};

const Module = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const voiceOver = searchParams.get('voiceOver') === 'true';
  const subtopicId = searchParams.get('subtopicId');

  const [currentSubtopic, setCurrentSubtopic] = useState(subtopicId ? Number(subtopicId) : null);
  const [currentSlide, setCurrentSlide] = useState(1);
  const [showSubtopicList, setShowSubtopicList] = useState(false);

  const mainTopic = slidesData[id] || {};
  const subtopics = mainTopic.subtopics || {};
  const slides = currentSubtopic ? subtopics[currentSubtopic]?.slides || [] : [];
  const slide = slides.find(s => s.id === currentSlide) || null;
  const subtopicTitle = currentSubtopic ? subtopics[currentSubtopic]?.title : mainTopic.title;

  useEffect(() => {
    setCurrentSlide(1);
    setCurrentSubtopic(subtopicId ? Number(subtopicId) : null);
  }, [id, subtopicId]);

  useEffect(() => {
    stopAudio();
    if (voiceOver && slide) {
      const slideContent = slide.content.join(' ');
      convertTextToSpeech(slideContent).catch(() => {
        speakLocal(slideContent); // Fallback to local TTS
      });
    }

    return () => {
      stopAudio();
    };
  }, [currentSlide, voiceOver, slide]);

  useEffect(() => {
    stopAudio();
  }, [location]);

  const backgroundImage = 'https://ehub81.wordpress.com/wp-content/uploads/2025/01/bg.png';

  const handleSubtopicSelect = async (subtopicId) => {
    stopAudio();
    setCurrentSubtopic(subtopicId);
    setShowSubtopicList(false);
    setCurrentSlide(1);
  };

  const handlePreviousSlide = async () => {
    stopAudio();
    setCurrentSlide((prev) => {
      const newSlide = Math.max(prev - 1, 1);
      if (voiceOver) {
        const newSlideContent = slides[newSlide - 1];
        if (newSlideContent) {
          convertTextToSpeech(newSlideContent.content.join(' ')).catch(() => {
            speakLocal(newSlideContent.content.join(' ')); // Fallback to local TTS
          });
        }
      }
      return newSlide;
    });
  };

  const handleNextSlide = async () => {
    stopAudio();
    setCurrentSlide((prev) => {
      const newSlide = Math.min(prev + 1, slides.length);
      if (voiceOver) {
        const newSlideContent = slides[newSlide - 1];
        if (newSlideContent) {
          convertTextToSpeech(newSlideContent.content.join(' ')).catch(() => {
            speakLocal(newSlideContent.content.join(' ')); // Fallback to local TTS
          });
        }
      }
      return newSlide;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center py-4">
        <button onClick={() => setShowSubtopicList(!showSubtopicList)} className="bg-green-500 text-white p-2 rounded">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </button>
        <span className="text-center text-2xl uppercase font-bold">{subtopicTitle || 'Main Topic'}</span>
      </div>

      {showSubtopicList && (
        <div className="mt-4 border p-4 rounded bg-white shadow-md">
          <ul>
            {Object.keys(subtopics).map(subtopicId => (
              <li key={subtopicId} onClick={() => handleSubtopicSelect(Number(subtopicId))} className="cursor-pointer p-2 hover:bg-gray-200">
                {subtopics[subtopicId].title}
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentSubtopic && (
        <SlideTemplate backgroundImage={backgroundImage} voiceOver={voiceOver}>
          {slide && <SlideContent slide={slide} readAloud={convertTextToSpeech} />}
          <div className="buttons flex justify-between py-4">
            <button onClick={handlePreviousSlide} className="bg-gray-500 text-white p-2 rounded">Previous</button>
            <button onClick={handleNextSlide} className="bg-blue-500 text-white p-2 rounded">Next</button>
          </div>
        </SlideTemplate>
      )}
    </div>
  );
};

export default Module;
