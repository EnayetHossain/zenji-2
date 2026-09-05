import Marquee from "react-fast-marquee";
const MarqueeWrapper = (Marquee as any)?.default ? (Marquee as any).default : Marquee;

function MarqueeComponent() {
  return (
    <div className="w-full h-7 bg-destructive overflow-hidden flex items-center">
      <MarqueeWrapper className="font-mono text-[0.6rem] py-1 bg-destructive font-medium">
        <span>NEW DROP: BLUE FLAME TEE NOW AVAILABLE • LIMITED STOCK • THE_ORIGIN_DROP COLLECTION LIVE • FREE SHIPPING AUSTRALIA-WIDE ON ORDERS OVER A$100 •</span>
        <span>NEW DROP: BLUE FLAME TEE NOW AVAILABLE • LIMITED STOCK • THE_ORIGIN_DROP COLLECTION LIVE • FREE SHIPPING AUSTRALIA-WIDE ON ORDERS OVER A$100 •</span>
      </MarqueeWrapper>
    </div>
  )
}

export default MarqueeComponent;
