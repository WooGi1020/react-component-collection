import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";
import { vi } from "vitest";

describe("버튼", () => {
  it("기본 속성으로 올바르게 렌더링되어야 합니다.", () => {
    render(<Button>클릭</Button>);
    const button = screen.getByRole("button", { name: /클릭/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-500"); // default variant=primary
  });

  it("보조 속성이 올바르게 적용되어야 합니다.", () => {
    render(<Button variant="secondary">보조</Button>);
    const button = screen.getByRole("button", { name: /보조/i });
    expect(button).toHaveClass("bg-gray-500");
  });

  it("아이콘 크기가 올바르게 적용되어야 합니다.", () => {
    render(
      <Button size="icon" aria-label="icon button">
        +
      </Button>
    );
    const button = screen.getByRole("button", { name: "icon button" });
    expect(button).toHaveClass("rounded-full");
  });

  it("클릭 시 onClick이 호출되어야 합니다.", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    const button = screen.getByRole("button", { name: /클릭/i });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("비활성화 시 onClick이 호출되지 않아야 합니다.", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        비활성화됨
      </Button>
    );
    const button = screen.getByRole("button", { name: /비활성화됨/i });

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("isLoading이 참이면 aria-busy가 참으로 설정되어야 합니다.", () => {
    render(<Button isLoading>로딩 중...</Button>);
    const button = screen.getByRole("button", { name: /로딩 중\.\.\./i });
    expect(button).toHaveAttribute("aria-busy", "true");
  });

  it("isLoading이 참이면 클릭을 방지해야 합니다.", () => {
    const handleClick = vi.fn();
    render(
      <Button isLoading onClick={handleClick}>
        로딩 중...
      </Button>
    );
    const button = screen.getByRole("button", { name: /로딩 중\.\.\./i });

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
