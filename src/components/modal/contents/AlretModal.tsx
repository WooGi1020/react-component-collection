import Button from "@/components/Button";
import { ModalHeader, ModalBody, ModalFooter } from "..";
import useUiStore from "@/store/useUiStore";
import NestedModal from "./NestedModal";

export default function AlertModal() {
  const openModal = useUiStore((s) => s.openModal);

  const handleOpenNested = () => {
    openModal(NestedModal);
  };

  return (
    <>
      <ModalHeader>알림</ModalHeader>
      <ModalBody>
        <ModalBody>
          <p className="text-sm text-gray-600">이 작업을 계속하시겠습니까?</p>
        </ModalBody>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleOpenNested}>중첩 모달 열기</Button>
        <Button onClick={() => alert("취소됨")}>취소</Button>
        <Button>확인</Button>
      </ModalFooter>
    </>
  );
}
