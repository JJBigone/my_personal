import { Marquee } from "./marquee";
import { motion } from "motion/react";

export interface BrandList {
  image: string;
  name: string;
  lightimg?: string;
}

export function BrandSlider({ brandList }: { brandList: BrandList[] }) {
  return (
    <section className="py-6 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="flex flex-col gap-3"
        >
          <div className="flex justify-center text-center py-3 relative">
            <div className="flex items-center justify-center gap-4">
              <div className="hidden md:block h-px w-24 sm:w-36 bg-gradient-to-r from-transparent to-[#D9C8AA]" />
              <p className="text-xs sm:text-sm font-medium text-[#746F64] tracking-wide uppercase">
                Featured Technologies &amp; Creative Tools
              </p>
              <div className="hidden md:block h-px w-24 sm:w-36 bg-gradient-to-l from-transparent to-[#D9C8AA]" />
            </div>
          </div>

          {brandList && brandList.length > 0 && (
            <div className="py-4">
              <Marquee pauseOnHover className="[--duration:25s] p-0">
                {brandList.map((brand, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-2xl glass-panel-subtle mx-2 border border-[#D9C8AA]/30 shadow-xs"
                  >
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="h-6 w-auto object-contain max-w-[120px] opacity-80 hover:opacity-100 transition-opacity"
                    />
                    <span className="text-xs font-semibold text-[#243D32]">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </Marquee>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default BrandSlider;
