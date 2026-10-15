// app/page.tsx
import { Metadata } from "next";
import MainClientUI from "./MainClientUI";

const SITE_URL = "https://oneclick-massage.netlify.app";

export const metadata: Metadata = {
  title: "서울 전체 마사지 추천 총정리｜후기 좋은 전국 마사지샵 안내 ｜원클릭마사지",
  description:
    "서울 출장마사지·스웨디시 업체를 원클릭에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.",
  keywords: [
    "원클릭마사지",
    "서울 출장마사지",
    "스웨디시 추천",
    "마사지샵 안내",
    "마사지 가격 및 코스",
    "수도권 출장마사지",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "서울 전체 마사지 추천 총정리｜후기 좋은 전국 마사지샵 안내 ｜원클릭마사지",
    description:
      "서울 출장마사지·스웨디시 업체를 원클릭에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.",
    url: SITE_URL,
    siteName: "원클릭마사지",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/banner.jpg`,
        width: 1200,
        height: 630,
        alt: "원클릭마사지 - 서울 전체 마사지 추천 총정리",
      },
    ],
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "원클릭마사지",
        description: "서울 전체 마사지 추천 총정리 및 전국 마사지샵 안내 플랫폼",
        inLanguage: "ko-KR",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": ["HealthAndBeautyBusiness", "Organization"],
        "@id": `${SITE_URL}/#organization`,
        name: "원클릭마사지",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
        image: `${SITE_URL}/banner.jpg`,
        description: "서울 출장마사지·스웨디시 시·군·구별 코스, 요금, 운영시간 안내",
        telephone: "0507-1280-3360",
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        areaServed: [
          {
            "@type": "AdministrativeArea",
            name: "서울특별시",
          },
          {
            "@type": "AdministrativeArea",
            name: "경기도",
          },
          {
            "@type": "AdministrativeArea",
            name: "인천광역시",
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "서울특별시",
          addressRegion: "수도권",
          addressCountry: "KR",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "0507-1280-3360",
          contactType: "customer service",
          areaServed: "KR",
          availableLanguage: ["Korean"],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "홈",
            item: SITE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "예약은 어떻게 하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "원클릭마사지는 제휴 샵 안내 플랫폼입니다. 마음에 드는 업체의 전화연결 버튼을 통해 직접 연락하여 예약하시면 됩니다.",
            },
          },
          {
            "@type": "Question",
            name: "어떤 지역까지 이용할 수 있나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "서울시 25개 구를 비롯해 경기도 및 인천광역시 전 지역의 제휴 마사지샵 및 출장 테라피 정보를 확인하실 수 있습니다.",
            },
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#050505]">
      {/* 1. 검색엔진 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. 네이버 수집 봇(Yeti)용 SSR 핵심 시맨틱 텍스트 */}
      <header className="sr-only">
        <h1>서울 전체 마사지 추천 총정리｜원클릭마사지</h1>
        <p>
          서울 출장마사지·스웨디시 업체를 원클릭에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.
        </p>
      </header>

      {/* 3. 메인 인터랙션 UI 컴포넌트 */}
      <MainClientUI />
    </main>
  );
}