const hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) =>
  i.toString(16).padStart(2, "0")
);

const u8a = (a: any): a is Uint8Array => a instanceof Uint8Array;

export function bytesToHex(bytes: Uint8Array): string {
  if (!u8a(bytes)) throw new Error("Uint8Array expected");
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes[bytes[i]];
  }
  return hex;
}

const encoder = new TextEncoder();

export function stringToBytes(str: string): Uint8Array {
  return encoder.encode(str);
}
