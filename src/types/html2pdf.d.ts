declare module 'html2pdf.js' {
  type Html2PdfWorker = {
    set: (opt: Record<string, unknown>) => Html2PdfWorker;
    from: (element: HTMLElement) => Html2PdfWorker;
    save: () => Promise<void>;
  };

  function html2pdf(): Html2PdfWorker;
  export default html2pdf;
}

