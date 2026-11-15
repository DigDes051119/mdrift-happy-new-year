type JsonLdPrimitive = boolean | number | string | null;

type JsonLdValue = JsonLdPrimitive | JsonLdValue[] | JsonLdObject;

export type JsonLdObject = {
  [key: string]: JsonLdValue | undefined;
};

export type JsonLdDocument = JsonLdObject & {
  "@context": string;
};

type JsonLdProps = {
  value: JsonLdDocument;
};

export const serializeJsonLd = (value: JsonLdDocument): string =>
  JSON.stringify(value).replace(/</g, "\\u003c");

export function JsonLd({ value }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }}
    />
  );
}
