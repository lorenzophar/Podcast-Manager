<?php
/**
* Podcast Manager for Joomla!
*
* @version		$Id$
* @copyright	Copyright (C) 2011 Michael Babker. All rights reserved.
* @license		GNU/GPL - http://www.gnu.org/copyleft/gpl.html
* 
*/

// No direct access.
defined('_JEXEC') or die;
$user = JFactory::getUser();
JHTML::stylesheet('administrator/components/com_podcastmanager/media/css/template.css', false, false, false);
?>
<table width="100%">
	<tr valign="top">
		<td width="200">
			<fieldset id="treeview">
				<legend><?php echo JText::_('COM_PODCASTMEDIA_FOLDERS'); ?></legend>
				<div id="media-tree_tree"></div>
				<?php echo $this->loadTemplate('folders'); ?>
			</fieldset>
		</td>
		<td>
			<?php if (($user->authorise('core.create','com_podcastmanager')) and $this->require_ftp): ?>
				<form action="index.php?option=com_podcastmedia&amp;task=ftpValidate" name="ftpForm" id="ftpForm" method="post">
					<fieldset title="<?php echo JText::_('COM_PODCASTMEDIA_DESCFTPTITLE'); ?>">
						<legend><?php echo JText::_('COM_PODCASTMEDIA_DESCFTPTITLE'); ?></legend>
						<?php echo JText::_('COM_PODCASTMEDIA_DESCFTP'); ?>
						<label for="username"><?php echo JText::_('JGLOBAL_USERNAME'); ?></label>
						<input type="text" id="username" name="username" class="inputbox" size="70" value="" />

						<label for="password"><?php echo JText::_('JGLOBAL_PASSWORD'); ?></label>
						<input type="password" id="password" name="password" class="inputbox" size="70" value="" />
					</fieldset>
				</form>
			<?php endif; ?>

			<form action="index.php?option=com_podcastmedia" name="adminForm" id="mediamanager-form" method="post" enctype="multipart/form-data" >
				<input type="hidden" name="task" value="" />
				<input type="hidden" name="cb1" id="cb1" value="0" />
				<input class="update-folder" type="hidden" name="folder" id="folder" value="<?php echo $this->state->folder; ?>" />
			</form>

			<form action="index.php?option=com_podcastmedia&amp;task=folder.create&amp;tmpl=<?php echo JRequest::getCmd('tmpl','index');?>" name="folderForm" id="folderForm" method="post">
				<fieldset id="folderview">
					<div class="view">
						<iframe src="index.php?option=com_podcastmedia&amp;view=mediaList&amp;tmpl=component&amp;folder=<?php echo $this->state->folder;?>" id="folderframe" name="folderframe" width="100%" marginwidth="0" marginheight="0" scrolling="auto"></iframe>
					</div>
					<legend><?php echo JText::_('COM_PODCASTMEDIA_FILES'); ?></legend>
					<div class="path">
					<?php if ($user->authorise('core.create','com_podcastmanager')): ?>
						<input class="inputbox" type="text" id="folderpath" readonly="readonly" />
						<input class="inputbox" type="text" id="foldername" name="foldername"  />
						<input class="update-folder" type="hidden" name="folderbase" id="folderbase" value="<?php echo $this->state->folder; ?>" />
						<button type="submit"><?php echo JText::_('COM_PODCASTMEDIA_CREATE_FOLDER'); ?></button>
					<?php endif; ?>
					</div>
					<?php echo JHtml::_('form.token'); ?>
				</fieldset>
			</form>

			<?php if ($user->authorise('core.create','com_podcastmanager')):?>
			<!-- File Upload Form -->
			<form action="<?php echo JURI::base(); ?>index.php?option=com_podcastmedia&amp;task=file.upload&amp;tmpl=component&amp;<?php echo $this->session->getName().'='.$this->session->getId(); ?>&amp;<?php echo JUtility::getToken();?>=1&amp;format=json" id="uploadForm" name="uploadForm" method="post" enctype="multipart/form-data">
				<fieldset id="uploadform">
					<legend><?php echo $this->medmanparams->get('upload_maxsize')=='0' ? JText::_('COM_PODCASTMEDIA_UPLOAD_FILES_NOLIMIT') : JText::sprintf('COM_PODCASTMEDIA_UPLOAD_FILES', $this->medmanparams->get('upload_maxsize')); ?></legend>
					<fieldset id="upload-noflash" class="actions">
						<label for="upload-file" class="hidelabeltxt"><?php echo JText::_('COM_PODCASTMEDIA_UPLOAD_FILE'); ?></label>
						<input type="file" id="upload-file" name="Filedata" />
						<label for="upload-submit" class="hidelabeltxt"><?php echo JText::_('COM_PODCASTMEDIA_START_UPLOAD'); ?></label>
						<input type="submit" id="upload-submit" value="<?php echo JText::_('COM_PODCASTMEDIA_START_UPLOAD'); ?>"/>
					</fieldset>
					<div id="upload-flash" class="hide">
						<ul>
							<li><a href="#" id="upload-browse"><?php echo JText::_('COM_PODCASTMEDIA_BROWSE_FILES'); ?></a></li>
							<li><a href="#" id="upload-clear"><?php echo JText::_('COM_PODCASTMEDIA_CLEAR_LIST'); ?></a></li>
							<li><a href="#" id="upload-start"><?php echo JText::_('COM_PODCASTMEDIA_START_UPLOAD'); ?></a></li>
						</ul>
						<div class="clr"> </div>
						<p class="overall-title"></p>
						<?php echo JHTML::_('image','media/bar.gif', JText::_('COM_PODCASTMEDIA_OVERALL_PROGRESS'), array('class' => 'progress overall-progress'), true); ?>
						<div class="clr"> </div>
						<p class="current-title"></p>
						<?php echo JHTML::_('image','media/bar.gif', JText::_('COM_PODCASTMEDIA_CURRENT_PROGRESS'), array('class' => 'progress current-progress'), true); ?>
						<p class="current-text"></p>
					</div>
					<ul class="upload-queue" id="upload-queue">
						<li style="display:none;"></li>
					</ul>
					<input type="hidden" name="return-url" value="<?php echo base64_encode('index.php?option=com_podcastmedia'); ?>" />
					<input type="hidden" name="format" value="html" />
				</fieldset>
			</form>
			<?php endif;?>
		</td>
	</tr>
</table>
