import Input from "@/components/Input";

export default function InputPage() {
  return (
    <section>
      <h1 className="mb-2">공통 인풋 컴포넌트</h1>
      <Input required label="이메일" type="email" placeholder="이메일 입력" />
      <Input label="비밀번호" type="password" placeholder="비밀번호 입력" />
      <Input as="textarea" required label="소개" placeholder="소개 입력" />
    </section>
  );
}
