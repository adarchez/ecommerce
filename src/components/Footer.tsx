export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-center text-sm text-gray-500 py-6 dark:bg-neutral-900 dark:text-gray-400">
      © {new Date().getFullYear()} Intro Dev. Todos los derechos reservados.
    </footer>
  );
}
