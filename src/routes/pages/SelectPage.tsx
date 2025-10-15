import Select from "@/components/Select";
import { useState } from "react";

export default function SelectPage() {
  const [fruit, setFruit] = useState<string | number>();

  return (
    <section>
      <h1 className="mb-2">커스텀 셀렉트 컴포넌트</h1>
      <Select
        options={[
          { label: "Apple", value: "apple" },
          { label: "Banana", value: "banana" },
          { label: "Grape", value: "grape" },
        ]}
        value={fruit}
        onChange={setFruit}
        placeholder="과일 선택"
      />
      <p className="mt-2">선택된 값: {fruit ?? "없음"}</p>
    </section>
  );
}
