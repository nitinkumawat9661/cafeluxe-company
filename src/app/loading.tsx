import { BrandStateScreen } from "@/components/brand/BrandStateScreen";

export default function Loading() {
  return (
    <BrandStateScreen
      state="loading"
      animationMode="pulse"
      primaryAction={null}
      secondaryAction={null}
    />
  );
}
