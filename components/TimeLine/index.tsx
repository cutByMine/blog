// import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import cn from 'classnames'
import styles from './index.module.scss'

type Props = {
  className?: string
  onClick?: () => void
  items: Array<{
    date: string
    title: string
    desc?: string
  }>
}

const TimeLine: FC<Props> = ({ className, items, onClick }: Props) => {
  return (
    <div className={styles['timeline-small']}>
      <div className={styles['timeline-small-body']}>
        <ul>
          {items.map(item => (
            <li>
              <div className={cn(styles['bullet'], styles['pink'])}></div>
              <div className={styles['date']}>{item.date}</div>
              <div className={styles['desc']}>
                <h3>{item.title}</h3>
                {item.desc && <h4>{item.desc}</h4>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TimeLine
