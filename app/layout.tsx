// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://oneclick-massage.netlify.app';

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '서울 전체 마사지 추천 총정리·후기 좋은 샵 안내｜원클릭',
    template: '%s | 원클릭',
  },
  description:
    '서울 출장마사지·스웨디시 업체를 원클릭에서 확인하세요.코스, 요금, 운영시간을 투명하게 정리했습니다. 예약은 업체에 직접 하시면 됩니다.',
  keywords: [
    '원클릭마사지',
    '서울 출장마사지',
    '스웨디시 추천',
    '마사지샵 안내',
    '마사지 가격 및 코스',
  ],
  other: {
    'naver-site-verification': 'debc1424cd6701453ff1a2784dcfeb3e51b7c3ba',
  },
  authors: [{ name: '원클릭마사지', url: SITE_URL }],
  creator: '원클릭마사지',
  publisher: '원클릭마사지',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: '원클릭마사지',
    title: '서울 전체 마사지 추천 총정리·후기 좋은 샵 안내｜원클릭',
    description:
      '서울 출장마사지·스웨디시 업체를 원클릭에서 확인하세요.코스, 요금, 운영시간을 투명하게 정리했습니다. 예약은 업체에 직접 하시면 됩니다.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: '원클릭마사지 - 전국 마사지샵 안내',
      },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: '원클릭마사지',
      description: '서울 전체 마사지 추천 총정리 및 전국 마사지샵 안내 플랫폼',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      inLanguage: 'ko-KR',
    },
    {
      '@type': ['HealthAndBeautyBusiness', 'Organization'],
      '@id': `${SITE_URL}/#organization`,
      name: '원클릭마사지',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
      image: `${SITE_URL}/banner.jpg`,
      description: '서울 출장마사지·스웨디시 시·군·구별 코스, 요금, 운영시간 안내',
      telephone: '0507-1280-3360',
      priceRange: '60,000원~180,000원',
      currenciesAccepted: 'KRW',
      paymentAccepted: 'Cash, Credit Card',
      areaServed: [
        { '@type': 'AdministrativeArea', name: '서울' },
        { '@type': 'AdministrativeArea', name: '경기' },
        { '@type': 'AdministrativeArea', name: '인천' },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#050505] text-gray-100 antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}