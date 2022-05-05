import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { QueryRuleCustomData } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import {
  Hits,
  InstantSearch,
  SearchBox,
  Pagination,
  Highlight,
  Configure,
  connectHits,
  connectHitInsights,
} from 'react-instantsearch-dom';
import instantsearch from 'instantsearch.js';
import aa from 'search-insights';
  
  export function Content({
    linkedStoryGroup,
    resultsView,
  }) {
    const results = resultsView ? (
      <div
        style={linkedStoryGroup ? {} : { borderRadius: '0px 0px 5px 5px' }}
        className="container hits-container"
      >
        {resultsView}
      </div>
    ) : null;
  
    return (
      <div>
        {results}
      </div>
    );
  }
  
  Content.propTypes = {
    linkedStoryGroup: PropTypes.string,
    hasPlayground: PropTypes.bool,
    children: PropTypes.node,
    resultsView: PropTypes.node,
  };
  
  export function WrapWithHits({
    searchParameters: askedSearchParameters = {},
    children,
    searchBox = true,
    hasPlayground = false,
    linkedStoryGroup,
    pagination = true,
    hitsElement,
    appId,
    apiKey,
    indexName,
    initialSearchState,
    onSearchStateChange,
  }) {
    const searchClient = useMemo(() => {
      return algoliasearch(appId, apiKey);
    }, [appId, apiKey]);
  
    const hits = hitsElement;
  
    const searchParameters = {
      hitsPerPage: 10,
      ...askedSearchParameters,
    };
  
    const [searchState, setSearchState] = useState(initialSearchState);
  
    const setNextSearchState = (nextSearchState) => {
      setSearchState(nextSearchState);
      onSearchStateChange(nextSearchState);
    };
  
    return (
      <InstantSearch
        searchClient={searchClient}
        indexName={indexName}
        searchState={searchState}
        onSearchStateChange={setNextSearchState}
      >
        <Configure clickAnalytics userToken={'user-1'} {...searchParameters} />
        <Content
          linkedStoryGroup={linkedStoryGroup}
          hasPlayground={hasPlayground}
          resultsView={
            <div>
              <div className="hit-actions">
                {searchBox ? (
                  <SearchBox
                    translations={{
                      placeholder: 'Search',
                    }}
                  />
                ) : null}
              </div>
              {hits}
              <div className="hit-pagination">
                {pagination ? <Pagination showLast={true} padding={2} /> : null}
              </div>
            </div>
          }
        >
          {children}
        </Content>
      </InstantSearch>
    );
  }
  
  WrapWithHits.propTypes = {
    appId: PropTypes.string,
    apiKey: PropTypes.string,
    indexName: PropTypes.string,
    children: PropTypes.node,
    searchBox: PropTypes.bool,
    linkedStoryGroup: PropTypes.string,
    hasPlayground: PropTypes.bool,
    pagination: PropTypes.bool,
    searchParameters: PropTypes.object,
    hitsElement: PropTypes.element,
    initialSearchState: PropTypes.object,
    onSearchStateChange: PropTypes.func,
  };
  
  // defaultProps added so that they're displayed in the JSX addon
  WrapWithHits.defaultProps = {
    appId: 'M82NJL0HQR',
    apiKey: 'ee3a84ba03920991697896de5552d884',
    indexName: 'prod_stdwatch',
    initialSearchState: {},
    onSearchStateChange: (searchState) => searchState,
  };


const App = (props) => {
  aa('init', {
    appId: 'M82NJL0HQR',
    apiKey: 'ee3a84ba03920991697896de5552d884',
  });
  
  // let userToken = '';
  // window.aa('getUserToken', null, (err, algoliaUserToken) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  
  //   userToken = algoliaUserToken;
  //   console.log(algoliaUserToken)
  // });

  // const Hit = ({ hit, insights }) => (
  //   <div className="ui segments" key={hit.objectID}>
  //     <div className="postbox ui basic segment">
  //       <div className="ui grid attached">
  //         <div className="ten wide column"> 
  //           <h5 className="card-title">
  //               <a href={'https://www.stdwatch.com/' + hit.url}>
  //                 <Highlight attribute="title" hit={hit} />
  //               </a>
  //           </h5>
  //           <p className="card-text desktop-only">
  //             {hit.excerpt_text}
  //           </p>
  //           <button
  //             onClick={() => {
  //               console.log(hit)
  //               aa('convertedObjectIDsAfterSearch', {
  //                 userToken: 'user-1',
  //                 index:  'prod_stdwatch',
  //                 eventName: 'Product Clicked',
  //                 queryID: hit.__queryID,
  //                 objectIDs: [hit.objectID],
  //                 position: [hit.__position]
  //             })
  //             }}
  //           >
              
  //             See details
  //           </button>
  //         </div>

  //         <div className="six wide column" style={{maxHeight:"230px"}}>
  //           <a href={'https://www.stdwatch.com/' + hit.url}>
  //             <img className="img-fluid" src={'https://www.stdwatch.com/' + hit.image} />
  //           </a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const HitWithInsights = connectHitInsights(window.aa)(Hit);

    const StoryHits = connectHits(({ hits, insights }) => (
      <div>
        <div className="ui hidden divider"></div>
        {hits.map((hit) => (
          <div className="ui segments" key={hit.objectID}>
            <div className="postbox ui basic segment">
              <div className="ui grid attached">
                <div className="ten wide column"> 
                  <h5 className="card-title">
                      <a href={'https://www.stdwatch.com/' + hit.url} onClick={() => {
                          aa('clickedObjectIDsAfterSearch', {
                            userToken: 'user-1',
                            index:  'prod_stdwatch',
                            eventName: 'Product Clicked',
                            queryID: hit.__queryID,
                            objectIDs: [hit.objectID],
                            positions: [hit.__position]
                          })
                        }}>
                        <Highlight attribute="title" hit={hit} />
                      </a>
                  </h5>
                  <p className="card-text desktop-only">
                    {hit.excerpt_text}
                  </p>
                </div>
    
                <div className="six wide column" style={{maxHeight:"230px"}}>
                  <a href={'https://www.stdwatch.com/' + hit.url} onClick={() => {
                    aa('clickedObjectIDsAfterSearch', {
                      userToken: 'user-1',
                      index:  'prod_stdwatch',
                      eventName: 'Product Clicked',
                      queryID: hit.__queryID,
                      objectIDs: [hit.objectID],
                      positions: [hit.__position]
                    })
                  }}>
                    <img className="img-fluid" src={'https://www.stdwatch.com/' + hit.image} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ));
    
    const storyProps = {
      appId: 'M82NJL0HQR',
      apiKey: 'ee3a84ba03920991697896de5552d884',
      indexName: 'prod_stdwatch',
      linkedStoryGroup: 'QueryRuleCustomData.stories.tsx',
      hitsElement: <StoryHits />
    };
  
    return (
      <div>
        <WrapWithHits {...storyProps}>
          <QueryRuleCustomData>
          </QueryRuleCustomData>
        </WrapWithHits>
      </div>
    );
  };

  export default App;