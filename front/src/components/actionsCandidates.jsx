import React from 'react';
import CandidateButtons from './botoneraCandi';

const ActionsCandidates = (props) => {
  const candidate = props.candidate;
  const userRRHH = props.candidate.interviewerHR;
  const userSIST1 = props.candidate.interSIST1;
  const userSIST2 = props.candidate.interSIST2;
  return (
    !!props.candidate && !!props.candidate.id &&
    <div>
      <div id='infoCandi'>
        <div >
          <h1><span style={{ borderBottom: '1px solid black', fontSize: '1em' }}> Candidate Info</span></h1>
          <h3>Full Name :  <strong style={{ fontSize: '1em' }}>{' ' + candidate.name + ' ' + candidate.surname + ' '}</strong></h3>
          <h3>Email : <strong style={{ fontSize: '1em' }}>{' ' + candidate.email}</strong></h3>
          <h3>Status: <strong className={candidate.status} style={{ fontSize: '1em' }}>{candidate.status}</strong></h3>
          <a href={candidate.url} target='_blank'>Linked-in Profile</a>
        </div>
        <div>
          <h1 ><span style={{ borderBottom: '1px solid black', fontSize: '1em' }}>Users Assignment</span></h1>
          <h3>HR User Assigned : <strong style={{ fontSize: '1em' }}>{userRRHH && userRRHH.nombre}</strong></h3>
          <h3>IT User Assigned 1 : <strong style={{ fontSize: '1em' }}> {userSIST1 && userSIST1.nombre}</strong></h3>
          <h3>IT User Assigned 2 : <strong style={{ fontSize: '1em' }}>{userSIST2 && userSIST2.nombre}</strong></h3>
        </div>
      </div>
      {props.user && props.user.area === 'RRHH'
        ? <div>
          <div id='actions'>
            <h1 style={{ marginBottom: '25px', marginBottom: '30px' }}><span style={{ borderBottom: '1px solid black', fontSize: '1em' }}> HR ACTIONS</span></h1>
            <div style={{ margin: '30px' }}>
              <CandidateButtons
                onClickInterview={props.createInterview}
                candidate={props.candidate}
                submitHR={props.submitHR}
                user={props.user}Tech Aprroved
                questionSIS={props.questionSIS}
                changeCandStatus={props.changeCandStatus}
                history={props.history}
                submitHR={props.submitHR}
                handleChangeId={props.handleChangeId}
                submitSIST1={props.submitSIST1}
                submitSIST2={props.submitSIST2}
                usersSIST={props.usersSIST}
                usersRH={props.usersRH}
              />
            </div>
          </div>


        </div>

        : <div>
          <h1 style={{ marginLeft: '25px', marginBottom: '30px', marginTop: '40px' }}><span style={{ borderBottom: '1px solid black', fontSize: '1em' }}> SYST ACTIONS</span></h1>
          <div style={{ margin: '30px' }}>
            <CandidateButtons
              onClickSist={props.onClickSist}
              onClickInterview={props.onClickInterview}
              candidate={props.candidate}
              handleChangeId={props.handleChangeId}
              submitHR={props.submitHR}
              user={props.user}
              changeCandStatus={props.changeCandStatus}
              answersSIST={props.answersSIST}
              onClickInterviewSis={props.onClickInterviewSis}
              submitHR={props.submitHR}
              history={props.history}
              submitSIST1={props.submitSIST1}
              submitSIST2={props.submitSIST2}
              usersSIST={props.usersSIST}
              usersRH={props.usersRH}
            />
          </div>

        </div>
      }
    </div>
  );
};

export default ActionsCandidates;
