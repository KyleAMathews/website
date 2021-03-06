import cns from '@sindresorhus/class-names'
import React from 'react'

import Link from '../components/ExternalLink'
import Loading from '../components/Loading'
import PageLayout from '../layouts/PageLayout'
import { fetchRef } from '../lib/Operations'
import SS from '../lib/SessionStorage'

export default class extends React.Component {
  state = {
    /** @type {Array} */
    programs: SS.get('landing:programs') || [],
  }

  componentDidMount() {
    if (this.state.programs <= 0)
      fetchRef('programs').then(value => {
        SS.set('landing:programs', value)
        this.setState({ programs: value })
      })
  }

  render() {
    const { programs } = this.state

    const List = () =>
      programs.length > 0 ? (
        programs.map(p => (
          <div className='column is-half' key={p.id}>
            <div className='box'>
              <i className={cns('e1a-lg', p.icon)} />
              <h4 className='title is-4'>{p.name}</h4>
              <p>{p.description}</p>
              <br />
              <p>
                <Link href={p.link} className='button is-primary'>
                  Join this program
                </Link>
              </p>
              <br />
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )

    return (
      <PageLayout pageTitle='Programs'>
        <section className='section'>
          <div className='container'>
            <div className='has-text-centered'>
              <h1 className='title'>Programs</h1>
              <p className='subtitle'>
                Our available and ongoing programs on DSC PENS
              </p>
            </div>
          </div>
        </section>

        <section className='section'>
          <div className='container'>
            <div className='columns has-text-centered'>
              <List />
              <br />
            </div>
          </div>
        </section>

        <style jsx>{`
          .columns {
            flex-wrap: wrap;
            justify-content: center;
          }
        `}</style>
      </PageLayout>
    )
  }
}
