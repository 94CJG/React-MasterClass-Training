import { atom } from "recoil";

export const isDarkAtom = atom({
	key: "isDark",
	default: true,
});

// 이것들이 여러개의 방울을 만들기 위해 필요한 모든 것.