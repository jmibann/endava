onEnter={() => this.props.fetchMyCandidates(this.props.user.id)}

<RouteHook
  onEnter={this.props.getAllCandidates}
  path={`${this.props.match.path}/all`}
  render={CandidateTable}
/>
<RouteHook
  onEnter={() => this.props.fetchMyCandidates(this.props.user.id)}
  path={`${this.props.match.path}/me`}
  component={CandidateTable}
/>

handlePushId (e) {
    e.preventDefault();
    const ids = this.state.usersSIST.slice();
    const value = Number(e.target.value);
    if (e.target.name === 'sist1') ids[0] = value;
    if (e.target.name === 'sist2') ids[1] = value;
    console.log('"""""""""""""', this.state.usersSIST)
    this.setState({
      usersSIST: ids
    });
  }

  router.post('/setUserSIST', (req, res) => {
    console.log("=======================", req.body.arrayUsers)
    console.log('//////////////////', req.body.idCandi)
    Candidate.findByPk(req.body.idCandi)
      .then(candidate => {
        console.log(')=======', candidate);
        console.log('PUTPOOOOOOOO', req.body);
        candidate.setinterSIST1(req.body.arrayUsers[0]);
        if (req.body.arrayUsers[1]) candidate.setinterSIST2(req.body.arrayUsers[1])
      })
      .then(candidato => console.log(candidato))
  });

  .then(() => {
    const { candidate } = this.props;
    const interSIST1Id = candidate.interSIST1 && candidate.interSIST1.id;
    const interSIST2Id = candidate.interSIST2 && candidate.interSIST2.id;
    this.setState({
      usersSIST: [interSIST1Id, interSIST2Id]
    });
  });