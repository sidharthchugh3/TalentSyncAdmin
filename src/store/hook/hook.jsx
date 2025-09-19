// src/store/hook/hook.js
import { useDispatch, useSelector } from "react-redux";

// For dispatch
export const useAppDispatch = () => useDispatch();

// For selector
export const useAppSelector = useSelector;
