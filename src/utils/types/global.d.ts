import Lenis from "lenis"

declare global {
  interface Window {
    lenis?: Lenis
  }
}

export {}
// ليه؟ لأن TypeScript مش عارف إن احنا ضفنا خاصية lenis للـ window
// ب) الحل بـ global.d.ts:
// الملف ده بيقول لـ TypeScript: "يا TypeScript، الـ window دلوقتي عنده خاصية جديدة اسمها lenis"
