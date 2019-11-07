import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from 'components/functional/Tab/Tab';
import styled from 'styled-components';

const TabsTitleContainer = styled.ul`
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    justify-content: left;
    width: fit-content;
    margin: 0 auto;
    padding: 0 20px;
`;

const TabsContentContainer = styled.ul`
    display: flex;
    list-style: none;
    padding: 0 20px;
    flex-wrap: wrap;
`
/**
 * Creates Tabs based on passed children attributes
 * Single tab will be created for each passed <div lable="tabLable"> tab content </div> as child
 */
class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  /**
   * Updateds information about current active tab
   * triggers onTabChange callback function passed in props
   * @param {String} tab - tab lable
   * @returns {Void}
   */
  handleTabClick = (tab) => {
    const { onTabChange } = this.props;
    this.setState({ activeTab: tab });
    onTabChange();
  }

  /**
   * Rendreds tabs lables
   * @param {ReactNode} tabsData - array with tabs child objectsreact children collection
   * @example <div lable="tabLable"> tab content </div>
   * @returns {ReactNode} tabs lables react components collection
   */
  renderTabsLabels = (tabsData, activeTab) => {
        return tabsData.map(tabLable => {
            const { label, categoryEntries } = tabLable.props;
            return(
                <Tab
                    activeTab={activeTab}
                    key={label}
                    label={label}
                    categoryEntries={categoryEntries}
                    onClick={this.handleTabClick}
                />
            )
        })
    }
    /**
     * Filters passed down children to reflect current active tab
     * @param {ReactNode} tabsData - react children collection
     * @param {String} activeTab - current active tab
     * @returns {ReactNode} tab content - react components collection
     */
    renderTabContets = (tabsData, activeTab) => {
        return tabsData.filter((tabData) => tabData.props.label === activeTab)
        .map(tabContent => tabContent.props.children);
    } 

  render() {
    const { renderTabsLabels, renderTabContets } = this;
    const { activeTab } = this.state;
    const { children } = this.props;
    return (
      <div className="tabs">
        <TabsTitleContainer className="tab-names">
            {renderTabsLabels(children, activeTab)}
        </TabsTitleContainer>
        <TabsContentContainer>
          {renderTabContets(children, activeTab)}
        </TabsContentContainer>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.array.isRequired
}

export default Tabs