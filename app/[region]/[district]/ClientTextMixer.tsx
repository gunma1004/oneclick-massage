"use client";

import { useMemo } from "react";
import Link from "next/link";

interface ShopItem {
  id: number | string;
  name: string;
  desc: string;
  phone: string;
  price: string;
  image: string;
}

interface ClientTextMixerProps {
  region: string;
  district: string;
  dongName?: string;
  shops?: ShopItem[];
}

const SITE_URL = "https://oneclick-massage.netlify.app";

// 🌟 원클릭마사지 전용 마사지샵 안내 키워드 패턴
const WELLNESS_PATTERNS = [
  "서울 전체 마사지 추천 총정리｜후기 좋은 마사지샵 안내",
  "스웨디시 및 아로마 마사지 시·군·구별 코스·요금 안내",
  "프리미엄 감성 마사지 & 힐링 샵 정보 안내",
  "전국 및 수도권 인기 마사지샵 실시간 가격 비교",
  "지친 피로를 풀어주는 1:1 맞춤형 마사지 큐레이션",
  "힐링 테라피 프로그램 및 상세 운영 시간 안내",
  "숙련된 테라피스트의 품격 있는 바디 릴렉싱 안내",
  "엄선된 제휴 마사지샵 코스별 요금 및 리뷰 안내",
  "도심 속 힐링을 위한 전문 마사지샵 정보 총정리",
  "내 주변 마사지샵 찾기 및 투명한 가격 비교 가이드"
];

const defaultShops: ShopItem[] = [
  {
    id: 1,
    name: "원클릭안심테라피",
    desc: "굳은 근육을 부드럽게 이완하는 건식 타이 & 프리미엄 딥 릴렉스 전문 센터",
    phone: "0507-1280-3140",
    price: "90,000원부터~",
    image: "/shop1.jpg"
  },
  {
    id: 2,
    name: "오늘밤원클릭케어",
    desc: "천연 에센셜 오일과 정교한 핸드 테크닉의 프리미엄 아로마 바디 순환 케어",
    phone: "0507-1280-3199",
    price: "60,000원부터~",
    image: "/shop2.jpg"
  },
  {
    id: 3,
    name: "주주원클릭홈타이",
    desc: "타이와 아로마를 결합한 VIP 시그니처 힐링 프로그램",
    phone: "0507-1280-3197",
    price: "60,000원부터~",
    image: "/shop3.jpg"
  },
  {
    id: 4,
    name: "골든원클릭테라피",
    desc: "정직한 정찰제 운영과 편안한 힐링을 약속하는 감성 스웨디시",
    phone: "0507-1280-3360",
    price: "60,000원부터~",
    image: "/shop4.jpg"
  },
  {
    id: 5,
    name: "퀸즈원클릭홈케어",
    desc: "전문 테라피스트들의 1:1 맞춤형 VIP 피로회복 웰니스 케어",
    phone: "0507-1280-3296",
    price: "60,000원부터~",
    image: "/shop5.jpg"
  }
];

export default function ClientTextMixer({
  region,
  district,
  dongName,
  shops = defaultShops
}: ClientTextMixerProps) {
  const locationText = dongName ? `${district} ${dongName}`.trim() : `${district}`.trim();

  const introText = useMemo(() => {
    if (!locationText) return `서울 전체 마사지 추천 총정리｜후기 좋은 마사지샵 안내`;
    const index =
      Math.abs(
        locationText
          .split("")
          .reduce((acc, char) => acc + char.charCodeAt(0), 0)
      ) % WELLNESS_PATTERNS.length;
    return `${locationText} ${WELLNESS_PATTERNS[index]}`;
  }, [locationText]);

  // 🌟 검색엔진을 위한 ItemList + HealthAndBeautyBusiness 정형 데이터
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: shops.map((shop, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "HealthAndBeautyBusiness",
        name: `${locationText} ${shop.name}`,
        description: shop.desc,
        telephone: shop.phone,
        priceRange: shop.price,
        image: `${SITE_URL}${shop.image}`
      }
    }))
  };

  return (
    <div className="space-y-8">
      {/* 검색엔진용 ItemList 정형 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* 1. 지역 단위 상단 클린 키워드 배너 */}
      <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center shadow-inner">
        <p className="text-xs md:text-sm font-black text-amber-300 tracking-wide">
          ✨ {introText}
        </p>
        <p className="text-[11px] text-gray-400 mt-1">
          {locationText} 마사지·스웨디시 업체를 원클릭에서 확인하세요. 시·군·구별 코스와 이용 요금을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.
        </p>
      </div>

      {/* 2. 제휴 샵 리스트 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            🏆 {locationText} 추천 제휴 마사지샵
          </h2>
          <span className="text-[11px] text-gray-500">원클릭마사지 제휴 센터</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shops.map((shop) => {
            const shopDetailUrl = dongName
              ? `/${region}/${encodeURIComponent(district)}/${encodeURIComponent(dongName)}/shop/${shop.id}`
              : `/${region}/${encodeURIComponent(district)}/shop/${shop.id}`;

            return (
              <div
                key={shop.id}
                className="bg-gradient-to-br from-[#161619] to-[#101013] border border-amber-500/25 hover:border-amber-400 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group"
              >
                {/* 썸네일 이미지 링크 */}
                <Link
                  href={shopDetailUrl}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-amber-500/30 block"
                  aria-label={`${shop.name} 상세 정보 보기`}
                >
                  <img
                    src={shop.image}
                    alt={`${locationText} 마사지 - ${shop.name}`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>

                {/* 텍스트 및 상세 링크 */}
                <div className="flex-1 min-w-0">
                  <Link href={shopDetailUrl} className="block">
                    <h3 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                      {shop.name}
                    </h3>
                  </Link>

                  <p className="text-[11px] text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                    {shop.desc}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-amber-300">{shop.price}</span>

                    {/* 유선 연결 버튼 */}
                    <a
                      href={`tel:${shop.phone.replace(/-/g, "")}`}
                      className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow transition-all active:scale-95"
                    >
                      전화연결
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}