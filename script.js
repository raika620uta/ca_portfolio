/**
 * CA Advance ポートフォリオ — スクリプト
 * - Intersection Observerによるスクロール連動フェードイン（控えめ）
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // フェードインアニメーション
  // =========================================
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));
});
