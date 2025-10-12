import Button from "@/components/Button";
import { ModalRoot } from "@/components/modal";
import AlertModal from "@/components/modal/contents/AlretModal";
import useUiStore from "@/store/useUiStore";

export default function ModalPage() {
  const openModal = useUiStore((s) => s.openModal);

  const handleOpenAlert = () => {
    openModal(AlertModal);
  };

  return (
    <section>
      <h1 className="mb-2">커스텀 모달 컴포넌트</h1>
      <Button onClick={handleOpenAlert}>모달 열기</Button>
      <ModalRoot />
    </section>
  );
}
