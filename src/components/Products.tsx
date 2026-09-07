import { HiArrowLongRight } from "react-icons/hi2";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image1 from "@/assets/images/image1.png"
import Image2 from "@/assets/images/image2.png"

function Products() {
  return (
    <section className="bg-foreground text-background py-20">
      <div className="px-5 flex justify-between items-end mb-20">
        <div className="">
          <div className="font-mono text-[0.6rem] text-destructive pb-1 tracking-widest">
            COLLECTION // THE_ORIGIN_DROP
          </div>
          <div className="text-[clamp(2rem,11vw,3.75rem)] leading-14">LATEST_DROPS</div>
        </div>
        <Button className="font-mono text-[0.6rem] bg-foreground rounded-none border border-background text-background px-5 py-4 hover:bg-background hover:text-foreground">
          VIEW_ALL
        </Button>
      </div>

      <Carousel className="w-full mx-auto">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2 pl-4 lg:basis-1/4">
              <Card className="rounded-none py-0 [--card-spacing:0px] border border-background transition-all duration-300 group hover:scale-y-98">
                <CardContent className="flex aspect-square items-center justify-center p-0 relative overflow-hidden">
                  <div className="w-full h-full overflow-hidden relative">
                    <img src={Image1} alt="image" className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-0" />
                    <img src={Image2} alt="image" className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 scale-100 opacity-0 group-hover:opacity-100 group-hover:scale-110" />
                  </div>
                  <div className="absolute top-5 left-7 font-mono bg-destructive text-foreground w-full text-center -rotate-z-45 -translate-x-1/2 text-[0.54rem] font-medium">SALE 15% OFF</div>
                  <Button className="absolute transition-all duration-300 -bottom-full group-hover:bottom-0 left-0 rounded-none w-full font-mono text-[0.6rem] tracking-wider border-none">QUICK VIEW <HiArrowLongRight /></Button>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4 border-t border-background">
                  <div className="tracking-widest text-xs">Card title</div>
                  <div className="font-mono text-[0.6rem] font-medium line-through text-background/40">A$30.2</div>
                  <div className="text-xl text-destructive">A$494.4</div>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default Products;
