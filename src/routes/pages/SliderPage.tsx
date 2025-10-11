import Slider from "@/components/Slider";
import PICTURES from "@/constants/pictures.config";

export default function SliderPage() {
  return (
    <section>
      <h1 className="mb-5">커스텀 슬라이더 컴포넌트</h1>
      <Slider arr={PICTURES} w={1000} threshold={100} />
    </section>
  );
}
