import Marquee from "react-fast-marquee";
const MarqueeWrapper = (Marquee as any)?.default ? (Marquee as any).default : Marquee;

function MarqueeComponent() {
  return (
    <MarqueeWrapper className="font-mono text-[0.6rem] py-1 bg-destructive font-medium">
      <span>NEW DROP: BLUE FLAME TEE NOW AVAILABLE • LIMITED STOCK • THE_ORIGIN_DROP COLLECTION LIVE • FREE SHIPPING AUSTRALIA-WIDE ON ORDERS OVER A$100 •</span>
      <span>NEW DROP: BLUE FLAME TEE NOW AVAILABLE • LIMITED STOCK • THE_ORIGIN_DROP COLLECTION LIVE • FREE SHIPPING AUSTRALIA-WIDE ON ORDERS OVER A$100 •</span>
    </MarqueeWrapper >
  )
}

export default MarqueeComponent;
