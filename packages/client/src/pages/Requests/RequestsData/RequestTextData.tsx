import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../../main'
import cl from '../../General.module.css'
import { TextAreaGroupRequest } from 'components'
import { appData } from 'data/app'

export const RequestTextData = observer(() => {
  const { data } = useContext(Context)

  return (
    <div className={cl.panels} style={{ height: '25%' }}>
      <TextAreaGroupRequest
        tabIndex={7}
        id={`${data.ActiveRequestObj._id}_7`}
        disabled
        containerwidth={{ width: '50%' }}
        style={{ resize: 'none', height: 'calc(7rem + 2.5vh)' }}
        maxLength={250}
        label={appData.requestLabel.description}
        value={data.ActiveRequestObj.description || ''}
        main="description"
        multiline="true"
        required
      />
      {data.CurrentRequestObj.status !== appData.statusRequestArr[0].value &&
        data.CurrentRequestObj.status !== appData.statusRequestArr[1].value && (
          <TextAreaGroupRequest
            tabIndex={8}
            id={`${data.ActiveRequestObj._id}_8`}
            required
            disabled={
              data.CurrentRequestObj?.status ===
              appData.statusRequestArr[4].value
                ? true
                : false
            }
            placeholder={appData.placeholders.required}
            containerwidth={{ width: '50%' }}
            label={`${appData.requestLabel.solution} (min: ${appData.minlengthSolutionRequest}, max: ${appData.maxlengthSolutionRequest})`}
            maxLength={appData.maxlengthSolutionRequest}
            style={{ resize: 'none', height: 'calc(7rem + 2.5vh)' }}
            value={data.ActiveRequestObj.solution}
            main="solution"
            multiline="true"
          />
        )}
    </div>
  )
})

export default RequestTextData
