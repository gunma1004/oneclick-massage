import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    region?: string;
    district?: string;
    dong?: string;
    id?: string;
    shopId?: string;
  }>;
}

const SITE_URL = "https://oneclick-massage.netlify.app";

function getRegionFullName(region?: string): string {
  switch (region?.toLowerCase()) {
    case "seoul":
      return "서울";
    case "gyeonggi":
      return "경기";
    case "incheon":
      return "인천";
    default:
      return region || "";
  }
}

function safeDecode(str?: string): string {
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

function parseLocationText(region?: string, district?: string, dong?: string): string {
  const regionName = getRegionFullName(region);
  const decodedDistrict = safeDecode(district);
  const decodedDong = safeDecode(dong);
  return `${regionName} ${decodedDistrict} ${decodedDong}`.replace(/\s+/g, " ").trim();
}

const shopData: Record<string, {
  name: string;
  cleanName: string;
  phone: string;
  badge: string;
  image: string;
  desc: string;
  courses: { name: string; time: string; price: string; desc: string }[];
  features: string[];
}> = {
  "1": {
    name: "원클릭안심테라피",
    cleanName: "원클릭안심테라피",
    phone: "0507-1280-3140",
    badge: "원클릭 추천 제휴점",
    image: "/shop1.jpg",
    desc: "서울 전체 마사지 추천 총정리! 숙련된 테라피스트의 정성 어린 스웨디시 및 아로마 테라피 코스와 투명한 요금을 원클릭에서 확인하세요.",
    courses: [
      { name: "건식 타이 마사지 (기본)", time: "60분", price: "90,000원", desc: "전신 스트레칭과 지압을 통해 굳은 근육을 시원하게 풀어주는 정통 코스" },
      { name: "아로마 마사지 (순환)", time: "90분", price: "110,000원", desc: "천연 에센셜 오일로 전신 혈액순환과 피로 해소를 돕는 프리미엄 코스" },
      { name: "스웨디시 감성 테라피", time: "60분", price: "130,000원", desc: "부드러운 오일 터칭으로 심신의 깊은 이완과 숙면을 유도하는 코스" }
    ],
    features: ["투명한 정찰제 요금", "24시간 365일 연중무휴", "수도권 전지역 신속 안내", "철저한 위생 및 소독 관리"]
  },
  "2": {
    name: "오늘밤원클릭케어",
    cleanName: "오늘밤원클릭케어",
    phone: "0507-1280-3199",
    badge: "재방문율 최우수",
    image: "/shop2.jpg",
    desc: "지친 하루의 피로를 말끔히 풀어드리는 1:1 맞춤 홈케어! 타이 마사지부터 아로마 마사지까지 원하는 장소에서 편안하게 정통 힐링을 누려보세요.",
    courses: [
      { name: "타이 마사지 (베이직)", time: "60분", price: "60,000원", desc: "전신 근육을 시원하게 스트레칭하여 가볍고 개운한 몸을 만드는 베이직 코스" },
      { name: "아로마 마사지 (소프트)", time: "60분", price: "70,000원", desc: "향기로운 천연 오일과 부드러운 압으로 신체 긴장을 완화하는 아로마 코스" }
    ],
    features: ["정직한 정찰제", "친절 마인드 전문 힐러 상주", "간편 예약 지원"]
  },
  "3": {
    name: "주주원클릭홈타이",
    cleanName: "주주원클릭홈타이",
    phone: "0507-1280-3197",
    badge: "24시 정찰제 매칭",
    image: "/shop3.jpg",
    desc: "재방문율 1위 만족도! 정통 타이 마사지와 림프 순환을 돕는 아로마 마사지로 굳어있던 몸을 유연하고 활력 넘치게 회복시켜 드립니다.",
    courses: [
      { name: "스탠다드 정통 타이 마사지", time: "60분", price: "60,000원", desc: "머리부터 발끝까지 뭉친 근육을 시원하게 풀어주는 정통 타이 코스" },
      { name: "프리미엄 딥티슈 아로마 마사지", time: "90분", price: "90,000원", desc: "근육 결을 따라 부드럽게 속근육 깊은 곳까지 풀어주는 아로마 코스" }
    ],
    features: ["투명한 정찰제 운영", "신속한 매칭 보장", "개인정보 완벽 보호"]
  },
  "4": {
    name: "골든원클릭테라피",
    cleanName: "골든원클릭테라피",
    phone: "0507-1280-3360",
    badge: "베테랑 힐러진",
    image: "/shop4.jpg",
    desc: "베테랑 테라피스트들의 1:1 케어! 릴렉스 마사지와 전신 아로마 마사지로 수도권 전지역 어디서나 품격 있는 힐링을 선사합니다.",
    courses: [
      { name: "릴렉스 마사지 (건식)", time: "60분", price: "60,000원", desc: "원하는 피로 부위를 집중적으로 시원하게 풀어주는 맞춤형 릴렉스 코스" },
      { name: "천연 순환 아로마 마사지", time: "60분", price: "70,000원", desc: "천연 아로마 오일로 전신 혈액순환과 피부 보습을 돕는 아로마 코스" }
    ],
    features: ["세련된 감성 테라피", "정찰제 요금 적용", "24시간 상시 대기"]
  },
  "5": {
    name: "퀸즈원클릭홈케어",
    cleanName: "퀸즈원클릭홈케어",
    phone: "0507-1280-3296",
    badge: "만족도 1위",
    image: "/shop5.jpg",
    desc: "수도권 전지역 신속 안내! 타이 마사지, 아로마 마사지, 릴렉스 마사지를 정직한 정찰제 가격으로 편안하게 받아보세요.",
    courses: [
      { name: "컨디션 케어 타이 마사지", time: "60분", price: "60,000원", desc: "지친 몸의 피로를 시원한 스트레칭으로 해소하는 정통 타이 코스" },
      { name: "스페셜 릴렉스 아로마 마사지", time: "60분", price: "70,000원", desc: "향긋한 아로마 오일과 부드러운 손길로 진행되는 전신 아로마 코스" }
    ],
    features: ["투명한 정찰제", "수도권 전지역 빠른 안내", "고객 만족도 최상"]
  }
};

// 🌟 40개의 출장마사지 타이틀 순환 패턴
// 예: [동이름] 출장 타이아로마 마사지·홈타이 | [구이름] 안마 업체 | [샵이름]
const TITLE_PATTERNS = [
  (d: string, g: string, s: string) => `${d} 출장 타이아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 스포츠 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 프리미엄타이 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 릴렉스아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 고급스웨디시 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 아로마테라피 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 감성스웨디시 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 전통타이 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 딥티슈 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 힐링아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 바디케어 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 전신아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 정통타이 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 로미로미 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 힐링스웨디시 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 맞춤타이 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 순환아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 VIP스웨디시 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 건식스포츠 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 호텔식마사지 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 힐링테라피 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 황제아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 명품스웨디시 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 피로회복 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 허브아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 감성아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 소프트타이 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 타이스포츠 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 체형관리 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 릴렉싱테라피 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 스페셜아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 프리미엄스웨디시 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 통증케어 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 균형테라피 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 웰니스마사지 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 바디릴렉스 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 시그니처마사지 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 파워아로마 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 디톡스테라피 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
  (d: string, g: string, s: string) => `${d} 출장 안심마사지 마사지·홈타이 | ${g} 안마 업체 | ${s}`,
];

// 🌟 30개의 메타 디스크립션 순환 패턴
// 예: [동이름] 출장 마사지·홈타이·안마. [구이름] [샵이름] 건식 6만원부터 심야할증 없이 방문...
const DESC_PATTERNS = [
  (d: string, g: string, s: string) => `${d} 출장 마사지·홈타이·안마. ${g} ${s} 건식 6만원부터 심야할증 없이 방문. 가까운 업체를 투명한 가격으로 안내합니다. 전문 관리사가 집, 호텔, 오피스로 직접 방문해 편안한 힐링을 선사합니다.`,
  (d: string, g: string, s: string) => `${d} 출장 마사지·홈타이·안마. ${g} ${s} 전문 관리사 직접 방문. 건식 6만원부터 저녁 7시~새벽 5시 심야할증 없이 운영합니다. 코스와 이용 요금을 확인하고 직접 예약해 보세요.`,
  (d: string, g: string, s: string) => `${d} 출장마사지 및 스웨디시 전문 제휴처. ${g} ${s}에서 선입금 없는 투명한 정찰제로 어디든 신속하게 연결해 드립니다. 아로마와 타이 코스 요금을 확인해 보세요.`,
  (d: string, g: string, s: string) => `${d} 홈타이 및 출장 안마 서비스 안내. ${g} ${s} 숙련된 테라피스트가 고객님이 계신 곳으로 직접 찾아갑니다. 합리적인 코스 요금과 운영 시간을 확인하세요.`,
  (d: string, g: string, s: string) => `${d} 출장 아로마 및 스웨디시 힐링 케어. ${g} ${s} 일상의 피로를 말끔히 풀어주는 맞춤형 프로그램을 제공합니다. 전화·문자로 간편하게 예약하실 수 있습니다.`,
  (d: string, g: string, s: string) => `${d} 출장마사지·안마 정보 안내. ${g} ${s} 정직한 코스별 가격표와 실시간 예약 번호를 투명하게 공개합니다. 원클릭에서 편리하게 비교하세요.`,
  (d: string, g: string, s: string) => `${d} 프리미엄 출장 홈케어 마사지. ${g} ${s} 지친 몸과 마음을 달래주는 1:1 맞춤 테라피를 자택이나 호텔에서 편안하게 받아보세요.`,
  (d: string, g: string, s: string) => `${d} 출장 타이마사지 및 스웨디시 제휴점. ${g} ${s} 빠른 방문이 가능한 실속형 코스와 프리미엄 코스를 원클릭에서 만나보세요.`,
  (d: string, g: string, s: string) => `${d} 출장 바디케어 힐링 서비스. ${g} ${s} 거품 없는 가격과 검증된 관리사들의 정성스러운 손길로 완벽한 휴식을 선사합니다.`,
  (d: string, g: string, s: string) => `${d} 출장 마사지사 방문 서비스. ${g} ${s} 타이, 아로마, 스웨디시 전 코스 요금을 비교하고 원하는 시간대에 직접 예약하세요.`,
  (d: string, g: string, s: string) => `${d} 출장 안마 및 홈타이 추천 제휴점. ${g} ${s} 늦은 시간에도 심야할증 없이 이용 가능한 정직한 제휴 정보를 제공합니다.`,
  (d: string, g: string, s: string) => `${d} 출장마사지 실시간 제휴 정보. ${g} ${s} 뭉친 근육을 시원하게 풀어주는 전문 테라피스트의 방문 케어를 경험해 보세요.`,
  (d: string, g: string, s: string) => `${d} 맞춤형 출장 스웨디시 & 아로마. ${g} ${s} 프라이빗한 공간에서 누리는 고품격 릴렉싱 테라피 코스와 가격을 확인하세요.`,
  (d: string, g: string, s: string) => `${d} 출장 마사지·안마 샵 안내. ${g} ${s} 신속 방문과 투명한 정찰제로 고객 만족도가 높은 추천 제휴점입니다.`,
  (d: string, g: string, s: string) => `${d} 홈타이 출장 마사지 예약 센터. ${g} ${s} 집이나 숙소에서 편안하게 즐기는 힐링 테라피 프로그램과 상세 요금을 살펴보세요.`,
  (d: string, g: string, s: string) => `${d} 전문 출장 아로마 마사지. ${g} ${s} 고객님을 위한 1:1 맞춤 바디 릴렉싱 코스 및 실시간 전화 예약 안내.`,
  (d: string, g: string, s: string) => `${d} 출장 스웨디시 마사지 가이드. ${g} ${s} 부드러운 오일 터칭과 림프 순환 케어로 일상의 피로를 가볍게 비워보세요.`,
  (d: string, g: string, s: string) => `${d} 출장 타이 마사지 추천. ${g} ${s} 어디서나 부르면 바로 달려가는 신속 방문 홈케어 프로그램과 요금표.`,
  (d: string, g: string, s: string) => `${d} 힐링 출장 마사지 플랫폼. ${g} ${s} 코스별 소요 시간과 투명한 가격 정보를 한눈에 비교하세요.`,
  (d: string, g: string, s: string) => `${d} 출장 안마·홈타이 서비스. ${g} ${s} 검증된 실력파 관리사들의 정성 어린 맞춤 테라피로 몸과 마음의 안정을 되찾으세요.`,
  (d: string, g: string, s: string) => `${d} 출장 마사지 종합 안내. ${g} ${s} 가장 인기 있는 스웨디시 및 아로마 제휴 코스를 원클릭에서 확인하세요.`,
  (d: string, g: string, s: string) => `${d} 프리미엄 출장 웰니스 테라피. ${g} ${s} 번거로운 이동 없이 계신 곳에서 편리하게 마사지를 받으세요.`,
  (d: string, g: string, s: string) => `${d} 출장 마사지·안마 정보. ${g} ${s} 친절한 상담과 신속한 방문으로 최상의 힐링 만족도를 드립니다.`,
  (d: string, g: string, s: string) => `${d} 홈타이 출장 마사지 큐레이션. ${g} ${s} 투명한 정찰제 가격과 상세 코스 안내로 안심하고 이용하실 수 있습니다.`,
  (d: string, g: string, s: string) => `${d} 출장 아로마 마사지 추천. ${g} ${s} 천연 오일 케어와 힐링 프로그램 가격을 비교해 보세요.`,
  (d: string, g: string, s: string) => `${d} 출장 스웨디시 감성 테라피. ${g} ${s} 빠른 방문 보장과 정직한 안내를 원클릭에서 만나보세요.`,
  (d: string, g: string, s: string) => `${d} 출장 마사지·홈타이 예약 센터. ${g} ${s} 24시 제휴 정보와 맞춤형 바디케어 솔루션을 제공합니다.`,
  (d: string, g: string, s: string) => `${d} 전문 출장 안마 서비스. ${g} ${s} 검증된 파트너샵의 상세 코스 요금과 전화 연결 서비스를 제공합니다.`,
  (d: string, g: string, s: string) => `${d} 출장 릴렉스 마사지 안내. ${g} ${s} 쌓인 피로를 말끔히 해소해 주는 1:1 맞춤 방문 테라피를 확인하세요.`,
  (d: string, g: string, s: string) => `${d} 출장 마사지·스웨디시 총정리. ${g} ${s} 투명한 가격표와 이용 시간을 확인하고 직접 예약하세요.`,
];

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId] || shopData["1"];

  const districtName = safeDecode(resolvedParams.district);
  const dongName = safeDecode(resolvedParams.dong) || districtName;

  const charSum = (dongName + districtName + targetId + shop.cleanName).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const titleIndex = Math.abs(charSum) % TITLE_PATTERNS.length;
  const descIndex = Math.abs(charSum) % DESC_PATTERNS.length;

  const finalTitle = TITLE_PATTERNS[titleIndex](dongName, districtName, shop.cleanName);
  const finalDescription = DESC_PATTERNS[descIndex](dongName, districtName, shop.cleanName);

  const canonicalPath = resolvedParams.dong
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${targetId}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}/shop/${targetId}`;

  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: { absolute: finalTitle },
    description: finalDescription,
    alternates: { canonical: canonicalUrl },
    keywords: [
      `${dongName} 출장마사지`,
      `${districtName} 출장마사지`,
      `${dongName} 홈타이`,
      `${districtName} 안마`,
      `${shop.cleanName}`,
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
          url: `${SITE_URL}${shop.image}`,
          width: 800,
          height: 600,
          alt: `${dongName} 마사지 - ${shop.cleanName}`,
        },
      ],
    },
  };
}

export default async function ShopDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const targetId = resolvedParams.id || resolvedParams.shopId || "1";
  const shop = shopData[targetId] || shopData["1"];

  const currentRegion = parseLocationText(resolvedParams.region, resolvedParams.district, resolvedParams.dong);
  const regionName = getRegionFullName(resolvedParams.region);
  const districtName = safeDecode(resolvedParams.district);
  const dongName = safeDecode(resolvedParams.dong) || districtName;

  const charSum = (dongName + districtName + targetId + shop.cleanName).split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const titleIndex = Math.abs(charSum) % TITLE_PATTERNS.length;
  const descIndex = Math.abs(charSum) % DESC_PATTERNS.length;

  const finalTitle = TITLE_PATTERNS[titleIndex](dongName, districtName, shop.cleanName);
  const finalDescription = DESC_PATTERNS[descIndex](dongName, districtName, shop.cleanName);

  const canonicalPath = resolvedParams.dong
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}/shop/${targetId}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}/shop/${targetId}`;

  const currentUrl = `${SITE_URL}${canonicalPath}`;

  const backUrl = resolvedParams.dong
    ? `/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`
    : `/${resolvedParams.region}/${encodeURIComponent(districtName)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${currentUrl}/#business`,
        name: finalTitle,
        description: finalDescription,
        url: currentUrl,
        telephone: shop.phone,
        image: `${SITE_URL}${shop.image}`,
        priceRange: "60,000원~180,000원",
        currenciesAccepted: "KRW",
        paymentAccepted: "Cash, Credit Card",
        address: {
          "@type": "PostalAddress",
          streetAddress: dongName,
          addressLocality: districtName,
          addressRegion: regionName,
          addressCountry: "KR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: `${regionName} ${districtName} ${dongName}`,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "출장 마사지 프로그램",
          itemListElement: shop.courses.map((c) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: c.name,
              description: c.desc,
            },
            price: c.price.replace(/[^0-9]/g, ""),
            priceCurrency: "KRW",
            availability: "https://schema.org/InStock",
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${currentUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${shop.cleanName} 예약 및 이용 방법은 어떻게 되나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "하단의 전화 예약 또는 문자 상담 버튼을 통해 샵으로 직접 연결되며, 코스 및 방문 시간을 바로 조율하실 수 있습니다.",
            },
          },
          {
            "@type": "Question",
            name: `${dongName} 출장 마사지 요금과 코스는 어디서 확인하나요?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: "본 페이지에서 제휴 샵의 상세 코스, 이용 요금 및 운영 시간을 한눈에 비교하실 수 있습니다.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${currentUrl}/#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${districtName} 마사지`, item: `${SITE_URL}/${resolvedParams.region}/${encodeURIComponent(districtName)}` },
          ...(resolvedParams.dong
            ? [{ "@type": "ListItem", position: 3, name: `${dongName} 마사지`, item: `${SITE_URL}/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}` }]
            : []),
          { "@type": "ListItem", position: resolvedParams.dong ? 4 : 3, name: shop.cleanName, item: currentUrl },
        ],
      },
    ],
  };

  return (
    <div className="bg-[#050505] text-gray-100 min-h-screen flex flex-col font-sans selection:bg-amber-500 selection:text-black pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-amber-500/20 px-4 py-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.1)]">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-lg shadow-[0_0_12px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
              원
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                원클릭마사지
              </span>
              <span className="text-[9px] text-gray-400 tracking-tighter">ONECLICK PARTNER</span>
            </div>
          </Link>

          <Link
            href={backUrl}
            className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30 hover:bg-amber-500 hover:text-black transition-all"
          >
            ← {dongName} 목록
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1 space-y-8">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-400 flex items-center gap-2">
          <Link href="/" className="hover:text-amber-400">홈</Link>
          <span>&gt;</span>
          <Link href={`/${resolvedParams.region}/${encodeURIComponent(districtName)}`} className="hover:text-amber-400">{districtName}</Link>
          {resolvedParams.dong && (
            <>
              <span>&gt;</span>
              <Link href={`/${resolvedParams.region}/${encodeURIComponent(districtName)}/${encodeURIComponent(dongName)}`} className="hover:text-amber-400">{dongName}</Link>
            </>
          )}
          <span>&gt;</span>
          <span className="text-amber-400 font-bold">{shop.cleanName}</span>
        </nav>

        <section className="bg-[#121214] border border-amber-500/30 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          <div className="relative h-64 md:h-80 w-full overflow-hidden bg-neutral-900">
            <img
              src={shop.image}
              alt={`${dongName} 마사지 제휴점 - ${shop.cleanName}`}
              width={800}
              height={600}
              className="w-full h-full object-cover filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/30"></div>
            <span className="absolute top-4 left-4 bg-amber-500 text-black text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
              {shop.badge}
            </span>
          </div>

          <div className="p-6 md:p-8 space-y-4 -mt-8 relative z-10">
            <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 text-xs font-bold">
              📍 {currentRegion} 출장 마사지 제휴 안내
            </div>

            <h1 className="text-xl md:text-2xl font-black text-white">
              {finalTitle}
            </h1>

            <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-black/50 p-4 rounded-2xl border border-white/5">
              {finalDescription}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {shop.features.map((feat, idx) => (
                <div key={idx} className="bg-black/60 border border-amber-500/20 px-3 py-2 rounded-xl text-center text-[11px] font-bold text-amber-300">
                  ✓ {feat}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0d0d0f] border border-amber-500/20 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center">
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">PROGRAM & PRICE</span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-1">
              💎 {dongName} 코스 및 이용 요금표
            </h2>
          </div>

          <div className="space-y-4">
            {shop.courses.map((course, idx) => (
              <div key={idx} className="bg-black/60 border border-white/10 hover:border-amber-500/40 p-5 rounded-2xl flex flex-col md:flex-row justify-between md:items-center gap-3 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded border border-amber-500/30">
                      {course.time}
                    </span>
                    <h3 className="font-extrabold text-white text-base md:text-lg">{course.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400">{course.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-amber-400 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 inline-block">
                    {course.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-black/80 p-5 rounded-2xl border border-white/10">
          <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-1.5">
            <span>📌</span> 이용 안내 및 예약 방법
          </h3>
          <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
            <li>예약은 하단의 <strong>전화 예약</strong> 또는 <strong>문자 상담</strong> 버튼을 통해 제휴 샵으로 직접 진행하실 수 있습니다.</li>
            <li>정확한 운영 시간 및 코스별 상세 상담은 각 업체 담당 매니저에게 문의해 주세요.</li>
          </ul>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080a]/95 backdrop-blur-xl border-t border-amber-500/30 p-3 md:p-4 shadow-[0_-10px_25px_rgba(0,0,0,0.8)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 gap-3">
          <a
            href={`tel:${shop.phone}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform active:scale-95"
          >
            <span className="text-lg">📞</span> 전화로 예약하기
          </a>
          <a
            href={`sms:${shop.phone}?body=${encodeURIComponent(`[${currentRegion}]${shop.cleanName} 마사지 예약 문의드립니다. (원클릭마사지 보고 연락드렸어요)`)}`}
            className="flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm border border-white/10 hover:border-amber-500/40 transition-transform active:scale-95"
          >
            <span className="text-lg">💬</span> 간편 문자상담
          </a>
        </div>
      </div>
    </div>
  );
}