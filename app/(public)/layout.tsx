export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container mx-auto">{children}</div>
    </>
  );
}
