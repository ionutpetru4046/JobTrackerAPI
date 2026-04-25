export default function PageContainer({ children, style, withSidebar = false }) {
  return (
    <div
      className={`page-container ${withSidebar ? "with-sidebar" : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}