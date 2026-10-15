import { Metadata } from "next";
import Link from "next/link";
import DongDetailClient from "./DongDetailClient";

interface PageProps {
  params: Promise<{
    region: string;
    district: string;
    dong: string;
  }>;
}

const SITE_URL = "https://oneclick-massage.netlify.app";

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

// 🌟 40개의 중복되지 않는 동 타이틀 순환 패턴
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

// 🌟 30개의 중복되지 않는 동 메타 디스크립션 순환 패턴
const DESC_PATTERNS = [
  (d: string, g: string) => `${g} ${d} 출장 마사지·홈타이·안마. 건식 7만원부터 심야할증 없이 방문. 가까운 업체를 투명한 가격으로 안내합니다. 원클릭에서 ${g} ${d} 출장마사지와 스웨디시를 경험하세요. 프로 관리사가 고객님의 집, 호텔, 오피스로 직접 방문. 코스·가격과 관리사 정보를 확인하고 전화로 예약하세요.`,
  (d: string, g: string) => `${g} ${d} 출장 마사지·홈타이·안마. 전문 관리사 직접 방문. 건식 7만원부터 저녁 7시~새벽 5시 심야할증 없이 운영합니다. ${g} ${d} 지역 제휴 샵 코스와 이용 요금을 원클릭에서 비교하고 직접 예약해 보세요.`,
  (d: string, g: string) => `${g} ${d} 출장마사지 및 스웨디시 전문 안내. 선입금 없는 투명한 정찰제로 ${d} 어디든 신속하게 연결해 드립니다. 아로마와 타이 코스 가격을 확인하고 편안한 휴식을 누려보세요.`,
  (d: string, g: string) => `${g} ${d} 출장마사지 및 테라피 서비스 총정리. 숙련된 테라피스트가 고객님이 계신 곳으로 직접 찾아갑니다. 합리적인 코스 요금과 상세 운영 시간을 원클릭마사지에서 확인하세요.`,
  (d: string, g: string) => `${g} ${d} 출장마사지 및 스웨디시 힐링 케어. 일상의 피로를 말끔히 풀어주는 맞춤형 프로그램을 제공합니다. 직접 전화 예약으로 간편하게 이용하실 수 있습니다.`,
  (d: string, g: string) => `${d} 출장마사지·안마 정보 안내 플랫폼. ${g} ${d} 주민 및 방문객을 위한 정직한 코스별 가격표와 실시간 예약 번호를 투명하게 공개합니다.`,
  (d: string, g: string) => `${g} ${d} 프리미엄 출장 홈케어 마사지. 지친 몸과 마음을 달래주는 1:1 맞춤 테라피를 ${d} 자택이나 호텔에서 편안하게 받아보세요.`,
  (d: string, g: string) => `${d} 출장 타이마사지 및 스웨디시 전문 샵 안내. ${g} 전역에서 빠른 방문이 가능한 실속형 코스와 프리미엄 코스를 원클릭에서 만나보세요.`,
  (d: string, g: string) => `${d} 출장마사지 힐링 케어 서비스. 거품 없는 가격과 검증된 관리사들의 정성스러운 손길로 ${d}에서 완벽한 휴식을 선사합니다.`,
  (d: string, g: string) => `지금 ${g} ${d}에서 만나는 베테랑 출장 마사지사 방문 서비스. 타이, 아로마, 스웨디시 전 코스 요금을 비교하고 직접 예약하세요.`,
  (d: string, g: string) => `${g} ${d} 출장 마사지 및 테라피 추천. 늦은 시간에도 심야할증 없이 이용 가능한 정직한 제휴 업소 정보를 원클릭마사지가 제공합니다.`,
  (d: string, g: string) => `${d} 출장마사지 실시간 제휴 정보. ${g} ${d}에서 뭉친 근육을 시원하게 풀어주는 전문 테라피스트의 방문 케어를 경험해 보세요.`,
  (d: string, g: string) => `${g} ${d} 맞춤형 출장 마사지 & 아로마. 프라이빗한 공간에서 누리는 고품격 릴렉싱 테라피 코스와 가격을 확인하세요.`,
  (d: string, g: string) => `${d} 출장 마사지·테라피 샵 총정리. ${g} ${d} 전 지역 신속 방문과 투명한 정찰제로 고객 만족도가 높은 제휴점 안내입니다.`,
  (d: string, g: string) => `${g} ${d} 출장 마사지 테라피 예약 안내. 집이나 숙소에서 편안하게 즐기는 힐링 테라피 프로그램과 상세 요금을 살펴보세요.`,
  (d: string, g: string) => `${d} 전문 출장 마사지. ${g} ${d} 지역 고객님을 위한 1:1 맞춤 바디 릴렉싱 코스 및 실시간 전화 예약 안내.`,
  (d: string, g: string) => `${g} ${d} 출장 스웨디시 마사지 가이드. 부드러운 오일 터칭과 림프 순환 케어로 일상의 피로를 가볍게 비워보세요.`,
  (d: string, g: string) => `${d} 출장 마사지 테라피 추천. ${g} ${d} 어디서나 부르면 바로 달려가는 신속 방문 홈케어 프로그램과 요금표.`,
  (d: string, g: string) => `${g} ${d} 힐링 출장 마사지 플랫폼. 엄선된 제휴 업체의 코스별 소요 시간과 투명한 가격 정보를 한눈에 비교하세요.`,
  (d: string, g: string) => `${g} ${d} 출장 마사지·테라피 서비스. 검증된 실력파 관리사들의 정성 어린 맞춤 테라피로 몸과 마음의 안정을 되찾으세요.`,
  (d: string, g: string) => `${d} 출장 마사지 종합 안내. ${g} ${d} 일대에서 가장 인기 있는 스웨디시 및 아로마 제휴 업체를 원클릭에서 확인하세요.`,
  (d: string, g: string) => `${d} 출장마사지 테라피. 번거로운 이동 없이 ${d} 계신 곳에서 편리하게 고품격 마사지를 받으세요.`,
  (d: string, g: string) => `${d} 출장 마사지·테라피 정보. ${g} ${d} 전 지역 친절한 상담과 신속한 방문으로 최상의 힐링 만족도를 드립니다.`,
  (d: string, g: string) => `${d} 출장 마사지 테라피 큐레이션. 투명한 정찰제 가격과 상세 코스 안내로 안심하고 이용하실 수 있습니다.`,
  (d: string, g: string) => `${d} 출장마사지 아로마 추천. ${g} ${d} 지역 제휴샵의 천연 오일 케어와 힐링 프로그램 가격을 비교해 보세요.`,
  (d: string, g: string) => `${d} 출장마사지 스웨디시 테라피. ${g} ${d} 전역 빠른 방문 보장과 정직한 후불제 안내를 원클릭에서 만나보세요.`,
  (d: string, g: string) => `${d} 출장마사지·테라피 예약 센터. ${g} ${d} 주민들을 위한 24시 제휴 업소 정보와 맞춤형 바디케어 솔루션.`,
  (d: string, g: string) => `${d} 전문 출장마사지 서비스. ${g} ${d} 지역 내 검증된 파트너샵의 상세 코스 요금과 전화 연결 서비스를 제공합니다.`,
  (d: string, g: string) => `${d} 출장 릴렉스 마사지 안내. ${g} ${d}에서 쌓인 피로를 말끔히 해소해 주는 1:1 맞춤 방문 테라피를 확인하세요.`,
  (d: string, g: string) => `${d} 출장마사지·스웨디시 총정리. ${g} ${d} 제휴 업체의 투명한 가격표와 이용 시간을 확인하고 직접 예약하세요.`,
];

function getDynamicDongInsight(districtName: string, dongName: string, seed: number) {
  const dongInsightGroups = [
    {
      subtitle: `${dongName} 거주자 및 직장인을 위한 1:1 맞춤 바디 테라피 인사이트`,
      sec1Title: `1. ${dongName} 일대 직장인들의 좌식 업무와 승모근 긴장 완화`,
      sec1Text: [
        `${districtName} ${dongName}은 활발한 상업 공간과 주거 단지가 조화를 이루는 곳으로, 일상 업무나 컴퓨터 작업 등으로 인한 상체 근육의 긴장도가 높게 나타나는 지역입니다. 장시간 키보드와 마우스를 조작하다 보면 어깨가 안으로 말리는 라운드 숄더와 거북목 자세가 유발되기 쉽습니다.`,
        `이러한 국소 근막 긴장을 효과적으로 완화하기 위해서는 체온을 안정적으로 유지하면서 단축된 근섬유를 결을 따라 부드럽게 늘려주는 수기 요법이 필요합니다. 굳어있던 혈관이 확장되면서 순환이 촉진되고 피로 부산물이 빠르게 배출되어 가벼운 컨디션을 회복할 수 있습니다.`
      ],
      sec2Title: "2. 컨디션에 따른 건식 타이와 스웨디시 오일 케어 비교",
      sec2Text: [
        `테라피를 선택할 때는 당일의 피로도와 신체 통증 양상을 파악하는 것이 중요합니다. 건식 기법의 대표인 타이는 관절의 가동 범위를 넓혀주는 수동적 전신 스트레칭을 핵심으로 합니다.`,
        `반면 프리미엄 스웨디시는 식물성 오일을 도포하여 부드럽고 리드미컬하게 밀어 올리는 림프 순환 중심 테크닉으로, 정서적 안정과 깊은 이완을 유도합니다.`
      ],
      sec3Title: `3. ${dongName} 프라이빗 공간에서 누리는 힐링의 장점`,
      sec3Text: [
        `테라피의 생리학적 효과를 온전히 누리기 위해서는 심리적 안정감이 필수적입니다. 외부 매장으로 직접 이동할 때 소모되는 교통 체증이나 주차 스트레스를 덜어낼 수 있습니다.`,
        `내가 가장 익숙한 독립된 공간에서 진행되는 홈케어는 외부 자극이 원천 차단되어 부교감 신경계를 빠르게 활성화합니다.`
      ],
      sec4Title: "4. 안전하고 투명한 정찰제 이용 수칙",
      sec4Text: [
        `${dongName} 출장 마사지 서비스를 이용하실 때는 건전성과 투명성을 갖춘 공식 플랫폼을 확인하시는 것이 안전합니다. 사전 공시된 100% 현장 후불 정찰제 기준을 엄격히 준수하는 파트너 매장을 이용하세요.`
      ]
    }
  ];

  return dongInsightGroups[seed % dongInsightGroups.length];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { region, district, dong } = await params;
  const districtName = safeDecode(district);
  const dongName = safeDecode(dong);
  const regionFullName = getRegionFullName(region);

  const charSum = (dongName + districtName + region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const titleIndex = Math.abs(charSum) % TITLE_PATTERNS.length;
  const descIndex = Math.abs(charSum) % DESC_PATTERNS.length;

  const finalTitle = TITLE_PATTERNS[titleIndex](dongName, districtName);
  const finalDescription = DESC_PATTERNS[descIndex](dongName, districtName);
  const canonicalUrl = `${SITE_URL}/${region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${dongName} 출장마사지`,
      `${dongName} 마사지샵`,
      `${dongName} 홈타이`,
      `${dongName} 스웨디시`,
      `${districtName} 안마`,
      "원클릭마사지"
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
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
          alt: `${dongName} 마사지 추천 - 원클릭마사지`,
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const resolved = await params;
  const regionFullName = getRegionFullName(resolved.region);
  const districtName = safeDecode(resolved.district);
  const dongName = safeDecode(resolved.dong);

  const displayLocation = `${districtName} ${dongName}`;
  const charSum = (displayLocation + resolved.region).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const titleIndex = Math.abs(charSum) % TITLE_PATTERNS.length;
  const descIndex = Math.abs(charSum) % DESC_PATTERNS.length;

  const finalTitle = TITLE_PATTERNS[titleIndex](dongName, districtName);
  const finalDescription = DESC_PATTERNS[descIndex](dongName, districtName);
  const article = getDynamicDongInsight(districtName, dongName, Math.abs(charSum));
  const currentUrl = `${SITE_URL}/${resolved.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}/#business`,
        name: finalTitle,
        description: finalDescription,
        url: currentUrl,
        telephone: "0507-1280-3360",
        image: `${SITE_URL}/banner.jpg`,
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        areaServed: `${regionFullName} ${districtName} ${dongName}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: dongName,
          addressLocality: districtName,
          addressRegion: regionFullName,
          addressCountry: "KR",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${dongName} 마사지 예약은 어떻게 하나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "원클릭마사지는 제휴 샵 안내 플랫폼입니다. 마음에 드는 업체의 전화연결 버튼을 통해 직접 연락하여 예약하시면 됩니다.",
            },
          },
          {
            "@type": "Question",
            name: `${dongName} 지역 제휴 업체들의 요금과 코스는 어디서 보나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "본 페이지에서 시·군·구별 제휴 샵들의 상세 코스, 이용 요금 및 운영 시간을 한눈에 비교하실 수 있습니다.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${districtName} 마사지`, item: `${SITE_URL}/${resolved.region}/${encodeURIComponent(districtName)}` },
          { "@type": "ListItem", position: 3, name: `${dongName} 마사지`, item: currentUrl },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans pb-24 md:pb-10 selection:bg-amber-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between">
          <Link href="/" className="font-black text-lg text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black flex items-center justify-center font-black text-sm">원</span>
            원클릭마사지
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href={`/${resolved.region}/${encodeURIComponent(districtName)}`}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
            >
              ← {districtName} 전체보기
            </Link>
            <a
              href="tel:050712803360"
              className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-transform active:scale-95"
            >
              📞 제휴 문의
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 w-full flex-1 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400">홈</Link>
          <span>&gt;</span>
          <Link href={`/${resolved.region}/${encodeURIComponent(districtName)}`} className="hover:text-amber-400">{districtName}</Link>
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{dongName}</span>
        </nav>

        <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-[0_0_40px_rgba(245,158,11,0.12)] bg-[#141418] p-6 md:p-8 space-y-2">
          <span className="text-amber-400 text-xs font-black tracking-widest uppercase block">
            {regionFullName} · {districtName} · {dongName} 마사지 큐레이션
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            {finalTitle}
          </h1>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            {finalDescription}
          </p>
        </section>

        <div className="tab_menu sticky top-16 bg-[#050505]/95 z-30 py-2 border-b border-white/10">
          <ul className="grid grid-cols-3 gap-2">
            <a href="#course_info" className="text-center py-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/20 transition">
              코스안내
            </a>
            <a href="#company_info" className="text-center py-2.5 rounded-xl bg-neutral-900 text-gray-300 border border-white/5 text-xs font-bold hover:text-white transition">
              이용안내
            </a>
            <a href="#faq_info" className="text-center py-2.5 rounded-xl bg-neutral-900 text-gray-300 border border-white/5 text-xs font-bold hover:text-white transition">
              자주묻는질문
            </a>
          </ul>
        </div>

        <DongDetailClient
          region={resolved.region}
          districtName={districtName}
          dongName={dongName}
          regionFullName={regionFullName}
        />

        <section id="course_info" className="space-y-4">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
            {dongName} 마사지샵 표준 코스 및 요금 안내
          </h2>
          <div className="grid gap-3">
            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">건식 타이</span>
                <h3 className="font-bold text-sm text-white mt-1">기본 전신 스트레칭 (60분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">뭉친 근육 긴장 완화 및 관절 가동성 회복</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-base">60,000원~</span>
              </div>
            </div>

            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">아로마 케어</span>
                <h3 className="font-bold text-sm text-white mt-1">천연 오일 림프 순환 (90분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">식물성 오일 블렌딩과 부드러운 림프 드레니쥐</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-base">90,000원~</span>
              </div>
            </div>

            <div className="bg-[#111114] border border-white/10 rounded-2xl p-4 flex justify-between items-center shadow-sm hover:border-amber-500/30 transition">
              <div>
                <span className="text-[10px] bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-bold">VIP 스웨디시</span>
                <h3 className="font-bold text-sm text-white mt-1">프리미엄 감성 바디 웰니스 (120분)</h3>
                <p className="text-xs text-gray-400 mt-0.5">심신의 깊은 휴식과 피로 완벽 리셋 시그니처</p>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-black text-base">150,000원~</span>
              </div>
            </div>
          </div>
        </section>

        <section id="company_info" className="bg-[#0e0e12] border border-white/10 rounded-2xl p-5 space-y-3 text-xs">
          <h2 className="text-sm font-bold text-white mb-2">{dongName} 서비스 이용 안내</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">운영시간</span>
            <span className="text-gray-200">업체별 상이 (상세 시간은 제휴 샵 문의)</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">위치안내</span>
            <span className="text-gray-200">{dongName} 및 인근 지역 출장 및 마사지샵 방문 안내</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2 border-b border-white/5">
            <span className="text-gray-400 w-20 shrink-0">예약방법</span>
            <span className="text-gray-200">원하시는 업체 번호로 직접 전화 또는 문자 예약</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-2">
            <span className="text-gray-400 w-20 shrink-0">이용에티켓</span>
            <span className="text-gray-200">건전한 마사지 문화를 지향하며 불법 퇴폐 문의는 사절합니다.</span>
          </div>
        </section>

        <article className="bg-[#0e0e12] p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 text-gray-300 leading-relaxed text-xs sm:text-sm">
          <div className="border-b border-white/10 pb-4">
            <span className="text-amber-400 font-extrabold text-xs tracking-widest block uppercase mb-1">
              LOCAL WELLNESS & CARE GUIDE
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              {article.subtitle}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {displayLocation} 고객님을 위한 신체 피로 회복 원리와 프라이빗 테라피 이용 가이드
            </p>
          </div>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec1Title}
            </h3>
            {article.sec1Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec2Title}
            </h3>
            {article.sec2Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec3Title}
            </h3>
            {article.sec3Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>

          <section className="space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">●</span> {article.sec4Title}
            </h3>
            {article.sec4Text.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </section>
        </article>

        <section id="faq_info" className="space-y-3">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block"></span>
            {dongName} 자주 묻는 질문
          </h2>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              {dongName} 마사지 예약은 어떻게 하나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              원클릭마사지는 제휴 샵 안내 플랫폼입니다. 마음에 드는 업체의 전화연결 버튼을 통해 직접 연락하여 예약하시면 됩니다.
            </p>
          </div>
          <div className="bg-[#111114] rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="font-bold text-xs sm:text-sm text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">Q</span>
              {dongName} 지역 제휴 업체들의 요금과 코스는 어디서 보나요?
            </div>
            <p className="text-xs text-gray-400 pl-7 leading-relaxed">
              본 페이지에서 시·군·구별 제휴 샵들의 상세 코스, 이용 요금 및 운영 시간을 한눈에 비교하실 수 있습니다.
            </p>
          </div>
        </section>
      </main>

      <aside className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/95 border-t border-amber-500/30 p-3 shadow-2xl backdrop-blur-md md:hidden">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{dongName} 마사지 큐레이션</div>
            <div className="text-[10px] text-amber-400">원클릭 제휴 샵 정보 안내</div>
          </div>
          <a
            href="tel:050712803360"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-5 py-2.5 rounded-xl shadow-md active:scale-95 transition-transform shrink-0 flex items-center gap-1.5"
          >
            <span>📞</span> 빠른 제휴문의
          </a>
        </div>
      </aside>

      <footer className="bg-[#040406] border-t border-white/10 py-8 text-center text-gray-500 text-xs mt-auto">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <div>
            <a
              href="tel:050712803360"
              className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-bold px-4 py-2 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all text-xs shadow-md"
            >
              <span>🤝</span> 원클릭마사지 제휴 문의 (0507-1280-3360)
            </a>
          </div>
          <p className="text-gray-400 font-medium">
            원클릭마사지는 서울 및 수도권 마사지 제휴 정보를 투명하게 안내하는 플랫폼입니다.
          </p>
          <p className="text-[11px] text-gray-600">
            COPYRIGHT &copy; ONECLICK-MASSAGE ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}