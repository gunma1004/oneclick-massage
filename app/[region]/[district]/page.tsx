import { Metadata } from "next";
import Link from "next/link";
import ClientTextMixer from "./ClientTextMixer";

const SITE_URL = "https://oneclick-massage.netlify.app";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
  }>;
}

function safeDecode(str: string): string {
  if (!str) return "";
  let decoded = str;
  try {
    decoded = decodeURIComponent(decodeURIComponent(str));
  } catch {
    try {
      decoded = decodeURIComponent(str);
    } catch {
      decoded = str;
    }
  }
  return decoded.trim();
}

function getRegionFullName(region: string): string {
  switch (region?.toLowerCase()) {
    case "seoul":
      return "서울특별시";
    case "gyeonggi":
      return "경기도";
    case "incheon":
      return "인천광역시";
    default:
      return region || "";
  }
}

// 🌟 40개의 중복되지 않는 타이틀 순환 패턴
const TITLE_PATTERNS = [
  (d: string, g: string) => `${d} 출장 타이아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 스포츠 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 프리미엄타이 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 릴렉스아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 고급스웨디시 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 아로마테라피 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 감성스웨디시 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 전통타이 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 딥티슈 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 힐링아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 바디케어 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 전신아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 정통타이 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 로미로미 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 힐링스웨디시 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 맞춤타이 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 순환아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 VIP스웨디시 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 건식스포츠 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 호텔식마사지 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 힐링테라피 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 황제아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 명품스웨디시 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 피로회복 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 허브아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 감성아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 소프트타이 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 타이스포츠 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 체형관리 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 릴렉싱테라피 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 스페셜아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 프리미엄스웨디시 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 통증케어 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 균형테라피 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 웰니스마사지 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 바디릴렉스 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 시그니처마사지 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 파워아로마 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 디톡스테라피 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
  (d: string, g: string) => `${d} 출장 안심마사지 마사지·홈타이 | ${g} 안마 업체 | 원클릭마사지`,
];

// 🌟 30개의 중복되지 않는 메타 디스크립션 순환 패턴
const DESC_PATTERNS = [
  (d: string, g: string) => `${g} ${d} 출장마사지·홈타이·안마. 건식 7만원부터 심야할증 없이 방문. 가까운 업체를 투명한 가격으로 안내합니다. 원클릭에서 ${g} ${d} 출장마사지와 스웨디시를 경험하세요. 프로 관리사가 고객님의 집, 호텔, 오피스로 직접 방문. 코스·가격과 관리사 정보를 확인하고 전화로 예약하세요.`,
  (d: string, g: string) => `${g} ${d} 출장마사지·홈타이·안마. 전문 관리사 직접 방문. 건식 7만원부터 저녁 7시~새벽 5시 심야할증 없이 운영합니다. ${g} ${d} 지역 제휴 샵 코스와 이용 요금을 원클릭에서 비교하고 직접 예약해 보세요.`,
  (d: string, g: string) => `${g} ${d} 출장마사지 및 스웨디시 전문 안내. 선입금 없는 투명한 정찰제로 ${d} 어디든 신속하게 연결해 드립니다. 아로마와 타이 코스 가격을 확인하고 편안한 휴식을 누려보세요.`,
  (d: string, g: string) => `${g} ${d} 마사지 및 출장 서비스 총정리. 숙련된 테라피스트가 고객님이 계신 곳으로 직접 찾아갑니다. 합리적인 코스 요금과 상세 운영 시간을 원클릭마사지에서 확인하세요.`,
  (d: string, g: string) => `${g} ${d} 출장 마사지 및 스웨디시 힐링 케어. 일상의 피로를 말끔히 풀어주는 맞춤형 프로그램을 제공합니다. 직접 전화 예약으로 간편하게 이용하실 수 있습니다.`,
  (d: string, g: string) => `${d} 출장마사지·안마 정보 안내 플랫폼. ${g} ${d} 주민 및 방문객을 위한 정직한 코스별 가격표와 실시간 예약 번호를 투명하게 공개합니다.`,
  (d: string, g: string) => `${g} ${d} 프리미엄 출장 홈케어 마사지. 지친 몸과 마음을 달래주는 1:1 맞춤 테라피를 ${d} 자택이나 호텔에서 편안하게 받아보세요.`,
  (d: string, g: string) => `${d} 출장 타이 마사지 및 스웨디시 전문 샵 안내. ${g} 전역에서 빠른 방문이 가능한 실속형 코스와 프리미엄 코스를 원클릭에서 만나보세요.`,
  (d: string, g: string) => `${g} ${d} 출장 바디 마사지 힐링 서비스. 거품 없는 가격과 검증된 관리사들의 정성스러운 손길로 ${d}에서 완벽한 휴식을 선사합니다.`,
  (d: string, g: string) => `지금 ${g} ${d}에서 만나는 베테랑 출장 마사지사 방문 서비스. 타이, 아로마, 스웨디시 전 코스 요금을 비교하고 직접 예약하세요.`,
  (d: string, g: string) => `${g} ${d} 출장마사지 및 홈타이 추천. 늦은 시간에도 심야할증 없이 이용 가능한 정직한 제휴 업소 정보를 원클릭마사지가 제공합니다.`,
  (d: string, g: string) => `${d} 출장마사지 실시간 제휴 정보. ${g} ${d}에서 뭉친 근육을 시원하게 풀어주는 전문 테라피스트의 방문 케어를 경험해 보세요.`,
  (d: string, g: string) => `${g} ${d} 맞춤형 출장마사지 & 아로마. 프라이빗한 공간에서 누리는 고품격 릴렉싱 테라피 코스와 가격을 확인하세요.`,
  (d: string, g: string) => `${d} 출장 마사지·안마 샵 총정리. ${g} ${d} 전 지역 신속 방문과 투명한 정찰제로 고객 만족도가 높은 제휴점 안내입니다.`,
  (d: string, g: string) => `${g} ${d} 출장 마사지 예약 안내. 집이나 숙소에서 편안하게 즐기는 힐링 테라피 프로그램과 상세 요금을 살펴보세요.`,
  (d: string, g: string) => `${d} 전문 출장 마사지. ${g} ${d} 지역 고객님을 위한 1:1 맞춤 바디 릴렉싱 코스 및 실시간 전화 예약 안내.`,
  (d: string, g: string) => `${g} ${d} 출장마사지 가이드. 부드러운 오일 터칭과 림프 순환 케어로 일상의 피로를 가볍게 비워보세요.`,
  (d: string, g: string) => `${d} 출장마사지 샵 추천. ${g} ${d} 어디서나 부르면 바로 달려가는 신속 방문 홈케어 프로그램과 요금표.`,
  (d: string, g: string) => `${g} ${d} 힐링 출장마사지 플랫폼. 엄선된 제휴 업체의 코스별 소요 시간과 투명한 가격 정보를 한눈에 비교하세요.`,
  (d: string, g: string) => `${g} ${d} 출장마사지 서비스. 검증된 실력파 관리사들의 정성 어린 맞춤 테라피로 몸과 마음의 안정을 되찾으세요.`,
  (d: string, g: string) => `${d} 출장 마사지 종합 안내. ${g} ${d} 일대에서 가장 인기 있는 스웨디시 및 아로마 제휴 업체를 원클릭에서 확인하세요.`,
  (d: string, g: string) => `${g} ${d} 프리미엄 출장 마사지 테라피. 번거로운 이동 없이 ${d} 계신 곳에서 편리하게 고품격 마사지를 받으세요.`,
  (d: string, g: string) => `${d} 출장마사지 정보. ${g} ${d} 전 지역 친절한 상담과 신속한 방문으로 최상의 힐링 만족도를 드립니다.`,
  (d: string, g: string) => `${g} ${d} 홈타이 출장 마사지 큐레이션. 투명한 정찰제 가격과 상세 코스 안내로 안심하고 이용하실 수 있습니다.`,
  (d: string, g: string) => `${d} 출장 아로마 마사지 추천. ${g} ${d} 지역 제휴샵의 천연 오일 케어와 힐링 프로그램 가격을 비교해 보세요.`,
  (d: string, g: string) => `${d} 출장 스웨디시 감성 마사지. ${g} ${d} 전역 빠른 방문 보장과 정직한 후불제 안내를 원클릭에서 만나보세요.`,
  (d: string, g: string) => `${d} 출장마사지·홈타이 예약 센터. ${g} ${d} 주민들을 위한 24시 제휴 업소 정보와 맞춤형 바디케어 솔루션.`,
  (d: string, g: string) => `${d} 전문 출장마사지 서비스. ${g} ${d} 지역 내 검증된 파트너샵의 상세 코스 요금과 전화 연결 서비스를 제공합니다.`,
  (d: string, g: string) => `${d} 출장 릴렉스 마사지 안내. ${g} ${d}에서 쌓인 피로를 말끔히 해소해 주는 1:1 맞춤 방문 테라피를 확인하세요.`,
  (d: string, g: string) => `${d} 출장 마사지·스웨디시 총정리. ${g} ${d} 제휴 업체의 투명한 가격표와 이용 시간을 확인하고 직접 예약하세요.`,
];

function getDynamicDistrictInsight(districtName: string, seed: number) {
  const sectionsGroup = [
    {
      subtitle: `${districtName} 지역 마사지샵 이용 가이드 및 코스 선택 팁`,
      sec1Title: "1. 내 몸 상태에 맞는 마사지 코스 선택하기",
      sec1Text: [
        `${districtName} 일대에서 마사지를 선택하실 때는 당일의 피로 부위와 컨디션을 고려하는 것이 좋습니다. 오일을 사용하지 않는 정통 타이 마사지는 굳어있는 관절과 근육을 시원하게 신전시키는 데 탁월하며, 스웨디시와 아로마 테라피는 부드러운 오일 터칭으로 심신의 깊은 이완과 림프 순환을 돕습니다.`,
        `본인의 취향과 피로도에 알맞은 프로그램을 선택하여 더욱 만족스러운 휴식을 경험해 보세요.`
      ],
      sec2Title: "2. 투명한 요금 비교와 직접 예약 시스템",
      sec2Text: [
        `원클릭마사지는 복잡한 중개 절차를 거치지 않고, 각 제휴 업체의 코스별 이용 요금과 운영 시간을 투명하게 안내해 드립니다.`,
        `마음에 드는 업체를 확인하신 후 기재된 연락처를 통해 직접 예약과 일정 조율을 진행하실 수 있어 빠르고 간편합니다.`
      ],
      sec3Title: "3. 프라이빗하고 편안한 힐링 타임",
      sec3Text: [
        `일상의 스트레스와 피로가 누적된 현대인들에게 1:1 맞춤 케어는 재충전을 위한 훌륭한 방법입니다.`,
        `${districtName}에서 엄선된 제휴 마사지샵과 함께 번거로움 없이 편안하고 쾌적한 힐링 시간을 누려보시기 바랍니다.`
      ],
      sec4Title: "4. 이용 시 참고사항 및 에티켓",
      sec4Text: [
        `원활한 서비스 이용을 위해 방문 또는 출장 예약 시 특이 체질이나 집중 관리를 원하시는 부위가 있다면 사전에 미리 공유해 주시는 것이 좋습니다.`,
        `예약 및 상세 문의는 각 업체 번호로 직접 연락해 주시면 친절하게 안내받으실 수 있습니다.`
      ]
    }
  ];

  return sectionsGroup[seed % sectionsGroup.length];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district } = await params;
  const districtName = safeDecode(district);
  const regionFullName = getRegionFullName(region);

  const charSum = (districtName + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  
  // 40개 타이틀 및 30개 디스크립션 순환 인덱스 계산
  const titleIndex = Math.abs(charSum) % TITLE_PATTERNS.length;
  const descIndex = Math.abs(charSum) % DESC_PATTERNS.length;

  const finalTitle = TITLE_PATTERNS[titleIndex](districtName, regionFullName);
  const finalDescription = DESC_PATTERNS[descIndex](districtName, regionFullName);
  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${districtName} 출장마사지`,
      `${districtName} 마사지샵`,
      `${districtName} 홈타이`,
      `${districtName} 스웨디시`,
      `${districtName} 안마`,
      "원클릭마사지"
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonicalUrl,
      siteName: "원클릭마사지",
      locale: "ko_KR",
      type: "article",
      images: [
        {
          url: `${SITE_URL}/banner.jpg`,
          width: 1200,
          height: 630,
          alt: `${districtName} 마사지 추천 - 원클릭마사지`,
        },
      ],
    },
  };
}

export default async function RegionalDetailPage({ params }: PageProps) {
  const { region, district } = await params;
  const districtName = safeDecode(district);
  const regionFullName = getRegionFullName(region);

  const charSum = (districtName + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const titleIndex = Math.abs(charSum) % TITLE_PATTERNS.length;
  const descIndex = Math.abs(charSum) % DESC_PATTERNS.length;

  const finalTitle = TITLE_PATTERNS[titleIndex](districtName, regionFullName);
  const finalDescription = DESC_PATTERNS[descIndex](districtName, regionFullName);
  const article = getDynamicDistrictInsight(districtName, Math.abs(charSum));
  const currentUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${currentUrl}/#webpage`,
        url: currentUrl,
        name: finalTitle,
        description: finalDescription,
        inLanguage: "ko-KR",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: SITE_URL,
          name: "원클릭마사지"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "홈",
            item: SITE_URL
          },
          {
            "@type": "ListItem",
            position: 2,
            name: regionFullName,
            item: `${SITE_URL}/${region}`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: districtName,
            item: currentUrl
          }
        ]
      },
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}/#localbusiness`,
        name: finalTitle,
        description: finalDescription,
        url: currentUrl,
        telephone: "0507-1280-3360",
        image: `${SITE_URL}/banner.jpg`,
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        address: {
          "@type": "PostalAddress",
          addressLocality: districtName,
          addressRegion: regionFullName,
          addressCountry: "KR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${regionFullName} ${districtName}`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${districtName} 마사지 예약은 어떻게 하나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "원클릭마사지는 제휴 샵 안내 플랫폼입니다. 마음에 드는 업체의 전화연결 버튼을 통해 직접 연락하여 예약하시면 됩니다.",
            },
          },
          {
            "@type": "Question",
            name: `${districtName} 지역 제휴 업체들의 요금과 코스는 어디서 보나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "본 페이지에서 시·군·구별 제휴 샵들의 상세 코스, 이용 요금 및 운영 시간을 한눈에 비교하실 수 있습니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
          <Link href="/" className="font-black text-lg text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-sm">원</span>
            원클릭마사지
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              전체 홈으로
            </Link>
            <a
              href="tel:050712803360"
              className="px-3.5 py-1.5 rounded-full bg-amber-500 text-black font-black text-xs hover:scale-105 transition-transform"
            >
              📞 제휴 문의
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-12">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-amber-400 transition-colors">홈</Link>
          <span>&gt;</span>
          <Link href={`/${region}`} className="hover:text-amber-400 transition-colors">
            {regionFullName}
          </Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{districtName}</span>
        </nav>

        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418]">
          <div className="p-6 md:p-10 space-y-3">
            <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
              {regionFullName.toUpperCase()} · {districtName} 마사지 큐레이션
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-md">
              {finalTitle}
            </h1>
            <p className="text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
              {finalDescription}
            </p>
          </div>
        </section>

        <ClientTextMixer region={region} district={districtName} />

        <article className="bg-[#0e0e12] p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              MASSAGE & HEALING GUIDE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {article.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {districtName} 지역 고객님을 위한 올바른 마사지 코스 선택 및 이용 안내
            </p>
          </div>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec1Title}
            </h3>
            {article.sec1Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec2Title}
            </h3>
            {article.sec2Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec3Title}
            </h3>
            {article.sec3Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec4Title}
            </h3>
            {article.sec4Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>
        </article>
      </main>

      <footer className="bg-[#040406] border-t border-white/10 py-10 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-gray-400 font-medium">원클릭마사지는 서울 및 수도권 마사지 제휴 정보를 투명하게 안내하는 플랫폼입니다.</p>
          <p className="text-[11px] text-gray-600">COPYRIGHT &copy; ONECLICK-MASSAGE ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}