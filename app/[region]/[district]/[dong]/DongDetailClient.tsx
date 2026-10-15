"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DongDetailClientProps {
  region: string;
  districtName: string;
  dongName: string;
  regionFullName: string;
}

const initialShops = [
  {
    id: 1,
    name: "원클릭안심테라피",
    desc: "서울 전체 마사지 추천 총정리! 숙련된 테라피스트의 정성 어린 스웨디시 및 아로마 테라피",
    phone: "0507-1280-3140",
    price: "90,000원부터~",
    image: "/shop1.jpg",
  },
  {
    id: 2,
    name: "오늘밤원클릭케어",
    desc: "최고급 천연 아로마 오일을 활용한 전신 이완 및 림프 순환 케어 전문 프로그램",
    phone: "0507-1280-3199",
    price: "60,000원부터~",
    image: "/shop2.jpg",
  },
  {
    id: 3,
    name: "주주원클릭홈타이",
    desc: "재방문율 높은 제휴 샵! 철저한 위생 관리와 품격 있는 정통 타이 & 릴렉싱",
    phone: "0507-1280-3197",
    price: "60,000원부터~",
    image: "/shop3.jpg",
  },
  {
    id: 4,
    name: "골든원클릭테라피",
    desc: "전문 관리사들의 맞춤형 바디 관리, 시간대별 편안한 VIP 피로회복 솔루션",
    phone: "0507-1280-3360",
    price: "60,000원부터~",
    image: "/shop4.jpg",
  },
  {
    id: 5,
    name: "퀸즈원클릭홈케어",
    desc: "수도권 전지역 엄선된 파트너! 정직한 정찰제 코스와 함께하는 프라이빗 힐링 테라피",
    phone: "0507-1280-3296",
    price: "60,000원부터~",
    image: "/shop5.jpg",
  },
];

export default function DongDetailClient({
  region,
  districtName,
  dongName,
  regionFullName,
}: DongDetailClientProps) {
  const [shops, setShops] = useState(initialShops);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 🌟 클라이언트 마운트 후에만 안전하게 셔플을 실행하여 서버/클라이언트 불일치 차단
    setMounted(true);
    const shuffled = [...initialShops];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShops(shuffled);
  }, []);

  const fullLocation = `${regionFullName} ${districtName} ${dongName}`;
  const shortLocation = `${districtName} ${dongName}`;
  const displayShops = mounted ? shops : initialShops;

  return (
    <div className="space-y-8">
      {/* 1. 지역 디렉토리 안내 배너 */}
      <section className="bg-[#141418] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-lg">
        <span className="text-amber-400 text-xs font-black tracking-widest uppercase mb-1 block">
          {districtName} · {dongName} 마사지 큐레이션 안내
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-white">
          📍 {shortLocation} 마사지샵 추천 및 코스 안내
        </h2>
        <p className="text-xs md:text-sm text-gray-300 mt-2 leading-relaxed">
          {fullLocation} 출장마사지·스웨디시 업체를 원클릭에서 확인하세요. 시·군·구별로 나눠 코스와 이용 요금, 운영 시간을 정리했습니다. 예약은 각 업체에 직접 하시면 됩니다.
        </p>
      </section>

      {/* 2. 샵 리스트 섹션 */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-amber-400 tracking-wider uppercase">
            🏆 {shortLocation} 추천 제휴 마사지샵
          </h3>
          <span className="text-[11px] text-gray-500">원클릭마사지 제휴 센터</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-[#111114] border border-amber-500/20 hover:border-amber-500/60 rounded-2xl p-4 flex gap-4 items-center shadow-lg transition-all group"
            >
              <img
                src={shop.image}
                alt={`${shortLocation} 마사지 - ${shop.name}`}
                width={96}
                height={96}
                loading="lazy"
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border border-white/10 flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-sm md:text-base text-white truncate group-hover:text-amber-400 transition-colors">
                  {shop.name} <span className="text-xs font-normal text-gray-400">({dongName})</span>
                </h4>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2 leading-snug">
                  {shop.desc}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400">
                    {shop.price}
                  </span>
                  <a
                    href={`tel:${shop.phone.replace(/-/g, "")}`}
                    className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black text-xs px-3.5 py-1.5 rounded-xl shadow hover:brightness-105 active:scale-95 transition-all"
                  >
                    전화연결
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 하단 네비게이션 복귀 링크 */}
      <nav aria-label="이전 지역 이동" className="pt-2 flex justify-center gap-3">
        <Link
          href="/"
          className="text-xs bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl text-gray-400 hover:text-amber-400 transition-colors"
        >
          🏠 전체 홈으로
        </Link>
        <Link
          href={`/${region}/${encodeURIComponent(districtName)}`}
          className="text-xs bg-neutral-900 border border-white/10 px-4 py-2 rounded-xl text-amber-400 hover:text-yellow-300 transition-colors"
        >
          📍 {districtName} 다른 동 보기
        </Link>
      </nav>
    </div>
  );
}