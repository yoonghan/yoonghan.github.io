import { useDialogCreation } from "../Dialog/useDialogCreation/useDialogCreation"
import { email } from "../LetterBox"
import EmailSender from "../LetterBox/EmailSender"
import styles from "./SocialFab.module.css"

const SocialFabNoSSR = () => {
  const confirm = useDialogCreation(EmailSender)

  const onOpenEmail = () => {
    confirm({
      writeFrom: "",
      writeTo: email,
      onCancel: () => {},
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.fabActionButton}>
        <svg className={styles.fabActionButtonIcon}>
          <use xlinkHref="/img/social/social-sprite.svg#action"></use>
        </svg>
      </div>
      <ul className={styles.fabButtons}>
        <li className={styles.item}>
          <a
            aria-label="linkedIn"
            className={styles.link}
            target="onnew"
            href="//www.linkedin.com/in/han-yoong-33755361/"
          >
            <svg className={styles.fabActionButtonIcon}>
              <use xlinkHref="/img/social/social-sprite.svg#linkedin"></use>
            </svg>
          </a>
        </li>
        <li className={styles.item}>
          <a
            aria-label="git"
            className={styles.link}
            target="onnew"
            href="//github.com/yoonghan/Walcron"
          >
            <i
              className={`${styles.iconMaterial} ${styles.iconMaterialGit}`}
            ></i>
          </a>
        </li>
        <li className={styles.item}>
          <a
            aria-label="stackoverflow"
            className={styles.link}
            target="onnew"
            href="//stackoverflow.com/users/3893990/han"
          >
            <svg className={styles.fabActionButtonIcon}>
              <use xlinkHref="/img/social/social-sprite.svg#so"></use>
            </svg>
          </a>
        </li>
        <li className={styles.item}>
          <a
            aria-label="facebook"
            className={styles.link}
            target="onnew"
            href="//www.facebook.com/walcron"
          >
            <svg className={styles.fabActionButtonIcon}>
              <use xlinkHref="/img/social/social-sprite.svg#fb"></use>
            </svg>
          </a>
        </li>
        <li className={styles.item}>
          <button
            onClick={onOpenEmail}
            aria-label="gmail"
            onKeyPress={onOpenEmail}
            tabIndex={0}
          >
            <svg className={styles.fabActionButtonIcon}>
              <use xlinkHref="/img/social/social-sprite.svg#gm"></use>
            </svg>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default SocialFabNoSSR
