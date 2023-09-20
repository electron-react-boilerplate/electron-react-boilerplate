import React from 'react';
import * as S from './guides.styled';
import Collapsible from 'components/collapsible/collapsible';

const GuidesPage: React.FC = () => {
  return (
    <S.GuidesPage>
      <Collapsible title="Keyboard shortcuts">
        <h3>
          Autocopy snippet on exact match
          <span> (Cntrl or Command + Shift + S)</span>
        </h3>
        <ol>
          <li>
            First, select the text you want to use to search for snippets in
            your database and then use the shortcut. The app will open
            automatically.
          </li>
          <li>
            - If the text perfectly match a snippet you had created then the
            value of the snippet will be automatically copied to your clipboard
            and a success notification will pop up.
            <br />
            - If there is more than 1 match for the text selected then the
            results will be displayed for you to choose which one to copy.
            <br />- If no results are found, then create a new snippet for that
            text or review/adjust the search. Check also that blank spaces match
            the snippets keyword.
          </li>
          <li>
            Finally you just need to paste as you usually do wherever you want
            the snippet's content to be located.
          </li>
        </ol>
        <h3>
          Show/Hide Snippet App<span> (Cntrl or Command + Alt + S)</span>
        </h3>
        <ol>
          <li>
            If the app it's open you can use this shortcut to minimize it.
          </li>
          <li>
            If the app is minimized or not visible you can use this shortcut to
            show and focus it.
          </li>
        </ol>
      </Collapsible>
      <Collapsible title="How to create a snippet">
        <ol type="1">
          <li>
            Click the "Create Snippet" button located the top of the "SNIPPETS"
            page's left sidebar.
          </li>
          <li>
            A modal will pop up asking for the "keyword" of the snippet (the
            text value you will use to quickly find it) and the snippet's
            content you want (the actual content you are looking for and that
            will be copied to your clipboard).
          </li>
        </ol>
      </Collapsible>
      <Collapsible title="How to edit a snippet">
        <ol>
          <li>
            To edit a snippet's content select it and use the right text area to
            make all the changes you want
          </li>
          <li>
            To edit a snippet's keyword first click the "pencil" icon next to
            the current snippet title and an edition input will appear for you
            to change it
          </li>
        </ol>
      </Collapsible>
      <Collapsible title="How to delete a snippet">
        <ol>
          <li>
            To delete a snippet select it and click the red "delete" button on
            the right.
          </li>
          <li>
            A confirmation modal will pop up will appear asking if you want to
            continue.
          </li>
          <li>Click accept to delete it. This action can not be undone.</li>
        </ol>
      </Collapsible>
      <Collapsible title="How to clone a snippet">
        <ol>
          <li>
            To clone a existing snippet first select it and click the "clone"
            button on the right side of the app.
          </li>
          <li>
            A modal will pop up in which you can input the niw title and the
            content. Remember: snippets' keywords must be unique.
          </li>
          <li>Click the accept button and the new snippet will be created.</li>
        </ol>
      </Collapsible>
    </S.GuidesPage>
  );
};

export default GuidesPage;
