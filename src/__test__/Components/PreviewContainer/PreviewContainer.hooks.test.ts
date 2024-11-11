// src/__tests__/Hooks/usePreviewContainer.test.ts
import { act, renderHook } from "@testing-library/react-hooks";
import { vi } from "vitest";
import { usePreviewContainer } from "../../../Components/PreviewContainer/PreviewContainer.hooks";
import { getData } from "../../../services/apiService";
import { waitFor } from "@testing-library/react";

vi.mock("../../../services/apiService", () => ({
  getData: vi.fn(),
}));

describe("usePreviewContainer Hook", () => {
  it("should set modal title when handleOpenModal is called", () => {
    const { result } = renderHook(() => usePreviewContainer());
    act(() => result.current.handleOpenModal("Input"));
    expect(result.current.modalTitle).toBe("Input");
  });

  it("should fetch data and set componentData on successful call to handleGetInformation", async () => {
    const mockData = { data: [{ props: {} }, { props: {} }] };
    (getData as jest.Mock).mockResolvedValueOnce(mockData);

    const { result } = renderHook(() => usePreviewContainer());
    await act(async () => {
      await result.current.handleGetInformation("Input");
    });

    // Esperamos hasta que `componentData` se actualice
    await waitFor(() => expect(result.current.componentData).toHaveLength(2), { timeout: 2000 });
  });

  it("should handle error when data fetch fails in handleGetInformation", async () => {
    (getData as jest.Mock).mockRejectedValueOnce(new Error("Fetch error"));

    const { result } = renderHook(() => usePreviewContainer());
    await act(async () => {
      await result.current.handleGetInformation("Input");
    });

    // Esperamos hasta que `componentData` esté vacío después del fallo
    await waitFor(() => expect(result.current.componentData).toEqual([]), { timeout: 2000 });
  });

  it("should toggle isOpen state with onOpen and onClose", () => {
    const { result } = renderHook(() => usePreviewContainer());
    act(() => result.current.handleOpenModal("Input"));
    expect(result.current.isOpen).toBe(true);

    act(() => result.current.onClose());
    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle isCounterOpen state with onOpenCounter and onCloseCounter", async () => {
    const { result } = renderHook(() => usePreviewContainer());
    await act(async () => {
      await result.current.handleGetInformation("Checkbox");
    });
    expect(result.current.isCounterOpen).toBe(true);

    act(() => result.current.onCloseCounter());
    expect(result.current.isCounterOpen).toBe(false);
  });
});
