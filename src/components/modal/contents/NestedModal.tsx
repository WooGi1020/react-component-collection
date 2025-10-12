import Button from "@/components/Button";
import { ModalHeader, ModalBody, ModalFooter } from "..";
import useUiStore from "@/store/useUiStore";

export default function NestedModal({
  message = "중첩 모달입니다.",
}: {
  message?: string;
}) {
  const close = useUiStore((s) => s.closeModal);

  return (
    <>
      <ModalHeader hasClose={false}>중첩 모달</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button onClick={() => close()}>닫기</Button>
      </ModalFooter>
    </>
  );
}
