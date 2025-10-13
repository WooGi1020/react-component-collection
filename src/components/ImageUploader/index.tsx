import { User2, X, Camera } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import Button from "../Button";

export default function ImageUploader() {
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!uploadImage) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(uploadImage);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadImage]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      e.target.value = "";
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      alert("5MB 이하의 이미지 파일만 업로드할 수 있습니다.");
      return;
    }
    setUploadImage(file);
    e.target.value = "";
  };

  return (
    <div className="relative inline-block">
      <label
        htmlFor="file-upload"
        className="
          group relative size-30 rounded-full overflow-hidden cursor-pointer select-none
          bg-gradient-to-b from-gray-50 to-gray-100
          ring-1 ring-gray-200 hover:ring-gray-300
          shadow-sm
          grid place-items-center
        "
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="업로드된 이미지 미리보기"
              className="object-cover w-full h-full rounded-full transition-transform duration-200 ease-out group-hover:scale-105"
            />
          </>
        ) : (
          <div className="flex items-center justify-center">
            <User2 className="size-15 stroke-gray-400" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/20 transition-colors" />
        <Camera className="pointer-events-none absolute text-white opacity-0 group-hover:opacity-100 transition-opacity size-5" />
      </label>

      {uploadImage && (
        <Button
          variant="ghost"
          size="icon"
          className="
            absolute top-1.5 right-1.5
            bg-white
            shadow-sm
          "
          onClick={() => setUploadImage(null)}
          aria-label="이미지 제거"
          title="이미지 제거"
        >
          <X className="size-3 text-gray-700" />
        </Button>
      )}

      <input
        hidden
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}
