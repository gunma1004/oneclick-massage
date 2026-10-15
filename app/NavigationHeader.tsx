"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3 shadow-[0_4px_20px_rgba(245,158,11,0.08)]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* 로고 영역 */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-lg shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform flex-shrink-0">
            원
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              원클릭마사지
            </span>
            <span className="text-[9px] text-gray-400 tracking-tighter hidden sm:block">
              ONECLICK MASSAGE
            </span>
          </div>
        </Link>

        {/* 데스크톱 카테고리 메뉴 목록 */}
        <nav
          aria-label="주요 메뉴"
          className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-300"
        >
          <Link
            href="/seoul"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            서울 마사지
          </Link>

          <Link
            href="/gyeonggi"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            경기 마사지
          </Link>

          <Link
            href="/incheon"
            className="hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            인천 마사지
          </Link>

          {/* 지역안내 (순수 CSS 호버 드롭다운) */}
          <div className="relative group py-2">
            <span className="hover:text-amber-400 transition-colors flex items-center gap-1 text-xs font-bold text-gray-300 cursor-pointer">
              지역안내
              <span className="text-[10px] text-amber-400 transition-transform group-hover:rotate-180">
                ▼
              </span>
            </span>

            <div className="absolute top-full left-0 w-36 bg-[#121215] border border-amber-500/30 rounded-2xl shadow-2xl py-2 space-y-1 text-xs opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200 z-50">
              <Link
                href="/seoul"
                className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
              >
                📍 서울 권역
              </Link>
              <Link
                href="/gyeonggi"
                className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
              >
                📍 경기 권역
              </Link>
              <Link
                href="/incheon"
                className="block px-4 py-2 hover:bg-amber-500/10 hover:text-amber-400 transition-colors"
              >
                📍 인천 권역
              </Link>
            </div>
          </div>
        </nav>

        {/* 우측 빠른 문의 CTA 및 모바일 햄버거 버튼 */}
        <div className="flex items-center gap-2">
          <a
            href="tel:050712803360"
            className="bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-extrabold text-xs px-3.5 py-2 rounded-xl shadow transition-all active:scale-95 hover:brightness-105"
          >
            📞 제휴 문의
          </a>

          {/* 모바일 햄버거 토글 버튼 */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-amber-400 rounded-lg border border-white/10"
            aria-label="메뉴 열기"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 mt-3 pt-3 space-y-2 text-xs font-bold text-gray-300">
          <Link
            href="/seoul"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-amber-400"
          >
            서울 마사지샵 안내
          </Link>
          <Link
            href="/gyeonggi"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-amber-400"
          >
            경기 마사지샵 안내
          </Link>
          <Link
            href="/incheon"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg hover:bg-neutral-900 hover:text-amber-400"
          >
            인천 마사지샵 안내
          </Link>
        </div>
      )}
    </header>
  );
}