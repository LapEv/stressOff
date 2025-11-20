import Scrollbar from 'react-scrollbars-custom'
import cl from './modalHistory.module.css'
import { appData } from 'data/app'
import { DateToString } from 'utils/dateToString'
import { IRequestHistory } from './interface'
import { IHistoryRequests } from 'store/Data/interfaces'
import { memo } from 'react'

export const RequestHistory = memo(
  ({ visible, history, setModalHistory }: IRequestHistory) => {
    const rootClasses = [cl.modalHistory]
    const rootContent = [cl.modalHistoryContent]

    if (visible) {
      rootClasses.push(cl.active)
      rootContent.push(cl.active)
    }

    const ItemHistory = ({
      status,
      date,
      userID,
      username,
      solution,
    }: IHistoryRequests) => {
      const newStatus = appData.statusRequestArr.find(
        item => item.value === status,
      )?.name

      return (
        <div className={cl.itemContainer}>
          <div className={cl.status}>
            {appData.requestLabel.historyStatus}
            {newStatus}
          </div>
          <div className={cl.status}>
            {appData.requestLabel.date}
            {DateToString(date)}
          </div>
          <div className={cl.status}>
            {appData.requestLabel.userID}
            {userID}
          </div>
          <div className={cl.status}>
            {appData.requestLabel.username}
            {username}
          </div>
          <div className={cl.status}>
            {appData.requestLabel.historySolution}
            {solution}
          </div>
          <div className={cl.line}></div>
        </div>
      )
    }

    return (
      <div className={rootClasses.join(' ')} onClick={setModalHistory}>
        <div
          className={rootContent.join(' ')}
          onClick={e => e.stopPropagation()}>
          <Scrollbar>
            {history &&
              history.map(
                ({
                  status,
                  date,
                  userID,
                  username,
                  solution,
                }: IHistoryRequests) => (
                  <ItemHistory
                    status={status}
                    date={date}
                    userID={userID}
                    username={username}
                    solution={solution}
                    key={date.toString()}
                  />
                ),
              )}
          </Scrollbar>
        </div>
      </div>
    )
  },
)
