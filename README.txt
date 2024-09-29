#UI Layout

#On start up
+------------------------------------+
|------------------------------------|
|--- Rule Configuration Component ---|
|------------------------------------|
+------------------------------------+

&& +-------------+ +-------------+ &&
&& |-------------| |-------------| &&
&& |-- Rule 1 ---| |-- Rule 2 ---| &&
&& |-------------| |-------------| &&
&& +-------------+ +-------------+ &&

&& +-------------+ &&&&&&&&&&&&&&&&&&
&& |-------------| &&&&&&&&&&&&&&&&&&
&& |-- Rule 3 ---| &&&&&&&&&&&&&&&&&&
&& |-------------| &&&&&&&&&&&&&&&&&&
&& +-------------+ &&&&&&&&&&&&&&&&&&

#When subrules are being added
+------------------------------------+
|------------------------------------|
|--- Rule Configuration Component ---|
|------------------------------------|
+------------------------------------+

&& +-------------+ +-------------+ &&
&& |-------------| |-------------| &&
&& |-- Rule 1 ---| |-- Rule 2 ---| &&
&& |-------------| |-------------| &&
&& +-------------+ +-------------+ &&

&& +-------------+ &&&&&&&&&&&&&&&&&&
&& |-------------| &&&&&&&&&&&&&&&&&&
&& |-- Rule 3 ---| &&&&&&&&&&&&&&&&&&
&& |-------------| &&&&&&&&&&&&&&&&&&
&& +-------------+ &&&&&&&&&&&&&&&&&&
+------------------------------------+
|------------------------------------|
|-- Logical Operator between Rules --|
|------------------------------------|
+------------------------------------+

Dialog when editing a subrule
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&+---------------+&&&&&&&&&&&
&&&&&&&&&&|---------------|&&&&&&&&&&&
&&&&&&&&&&|--- Dialog ----|&&&&&&&&&&&
&&&&&&&&&&|---------------|&&&&&&&&&&&
&&&&&&&&&&+---------------+&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

#Implementation

1. Rule Configuration Component:
  a. Inputs:
    - Field (Dropdown)
    - Field Type (Text, readonly)
    - Condition (Dropdown)
    - Value (Text | Number)
  b. Datatypes for Field input options:
    - Portfolio (string)
    - Counterparty (string)
    - Price (number)
  c. Selecting an option for Field presets the Field Type and Condition:
    - Field = Portfolio or Counterparty => Field Type = string, Condition = Containing || Not Containing || Beginning With || Ending With
    - Field = Price => Field Type = number, Condition = Greater Than || Greater Than or Equal To || Lesser Than || Lesser Than or Equal To || Equal To || Not Equal To
  d. Validation check:
    - Field Type = number => Value must be a negative number or positive number or zero
    - Field Type = string => Value must contain A-Z, a-z or whitespace
    d1. Fail
      - Toast will be presented to inform users of the issue
    d2. Success
      - Subrule will be added to the global store - Subrules are organised into 3 categories for each Field and stored in a list data structure
      - Subrule will be display in the card
      - The Field of the subrule added will be added, if not already existing, to a set data structure in the global for logical operator functionality

2. Rule Component:
  a. Subrules are grouped by Field and organised into cards
  b. Actions including editing and deleting a subrule are included
    b1. Editing and deleting a subrule will update the appropriate list in the global store
    b2. Editing and deleting a subrule will also re-render the UI display
    b3. Clicking on the edit icon for a particular subrule will trigger a dialog to appear with editable fields (except for Field and Field Type) prepopulated with current values and acceptable values

3. Logical Operator Component (not implemented yet):
  a. A node containing a list of two unique Field and one logical operator string should be used for persistence, making up a tree structure

  export interface Node {
    logicalOperator: 'Intersect' | 'Union',
    rules: Field[]
  }
